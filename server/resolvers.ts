import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  CreateUserArgs,
  ProjectArgs,
  ChangePasswordArgs,
  UserWithOnlyUsername,
  UserType,
  NonSensitiveUser,
  UserIdArg,
  UserUsernameArg,
  ProjectType,
  HistoryLogType,
  ProjectIdArg,
  HistoryLogIdArg,
  UserParentType,
  ProjectParentType,
} from './types';
import { PoolClient } from 'pg';

export const resolvers = {
  Query: {
    // Get all users
    users: async (_: never, __: never, { db }: { db: PoolClient }) => {
      const result = await db.query<NonSensitiveUser>(
        'SELECT id, username FROM users;'
      );
      const users = result.rows;
      return users;
    },
    // Get a single user by ID
    user: async (_: never, { id }: UserIdArg, { db }: { db: PoolClient }) => {
      const result = await db.query<NonSensitiveUser>(
        'SELECT id, username FROM users WHERE id = $1',
        [id]
      );
      const user = result.rows[0];
      return user;
    },
    // Get a single user by username
    username: async (
      _: never,
      { username }: UserUsernameArg,
      { db, user }: { db: PoolClient; user: UserWithOnlyUsername }
    ) => {
      if (user.username !== username) {
        throw new GraphQLError('Unauthenticated user', {
          extensions: {
            code: 'UNAUTHENTICATED USER',
          },
        });
      }
      const result = await db.query<NonSensitiveUser>(
        'SELECT id, username FROM users WHERE username = $1',
        [username]
      );
      const userResult = result.rows[0];
      return userResult;
    },
    // Get all projects
    projects: async (_: never, __: never, { db }: { db: PoolClient }) => {
      const result = await db.query<ProjectType>(
        'SELECT * FROM projects ORDER BY id;'
      );
      const projects = result.rows;
      return projects;
    },
    // Get a single project by ID
    project: async (
      _: never,
      { id }: UserIdArg,
      { db }: { db: PoolClient }
    ) => {
      const result = await db.query<ProjectType>(
        'SELECT * FROM projects WHERE id = $1',
        [id]
      );
      const project = result.rows[0];
      return project;
    },
    // A history log of every project registered with Kensa
    historyLog: async (_: never, __: never, { db }: { db: PoolClient }) => {
      const result = await db.query<HistoryLogType>(
        'SELECT * FROM history_log;'
      );
      const historyLogs = result.rows;
      return historyLogs;
    },
    // A history log of every project queried during development mode
    historyLogDev: async (_: never, __: never, { db }: { db: PoolClient }) => {
      const result = await db.query<HistoryLogType>(
        'SELECT * FROM history_log_dev;'
      );
      const historyLogsDev = result.rows;
      return historyLogsDev;
    },
    fieldLogs: async (
      _: never,
      { operation_id }: { operation_id: string },
      { db }: { db: PoolClient }
    ) => {
      const result = await db.query(
        'SELECT * FROM resolver_log_dev WHERE operation_id = $1',
        [operation_id]
      );
      return result.rows;
    },
    projectFieldLogs: async (
      _: never,
      { project_id }: { project_id: string },
      { db }: { db: PoolClient }
    ) => {
      const result = await db.query(
        'SELECT * FROM resolver_log_dev WHERE project_id = $1',
        [project_id]
      );
      return result.rows;
    },
  },
  Mutation: {
    createUser: async (
      _: never,
      { username, password }: CreateUserArgs,
      { db }: { db: PoolClient }
    ) => {
      // Check if there is a same username exists in the database. If yes, throw error
      const dbResult = await db.query<NonSensitiveUser>(
        'SELECT id, username FROM users WHERE username = $1',
        [username]
      );
      const existingUser = dbResult.rows[0];
      if (existingUser) {
        throw new GraphQLError('Please choose different username', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert new user into database
      await db.query(
        'INSERT INTO users(username, password) VALUES($1, $2) RETURNING username;',
        [username, hashedPassword]
      );
      // Create token to send back to client
      const token = jwt.sign({ username: username }, process.env.JWT_KEY, {
        expiresIn: '1h',
      });

      return { username, token };
    },
    addProject: async (
      _: never,
      { project }: ProjectArgs,
      { db }: { db: PoolClient }
    ) => {
      const { project_name, api_key, server_url, userId } = project;
      const result = await db.query<ProjectType>(
        'INSERT INTO projects(project_name, api_key, server_url, user_id) VALUES($1, $2, $3, $4) RETURNING *;',
        [project_name, api_key, server_url, userId]
      );
      const addedProject = result.rows[0];
      return addedProject;
    },
    deleteProject: async (
      _: never,
      { id }: ProjectIdArg,
      { db }: { db: PoolClient }
    ) => {
      const result = await db.query<ProjectType>(
        'DELETE FROM projects WHERE id = $1 RETURNING *;',
        [id]
      );
      const deletedProject = result.rows[0];
      return deletedProject;
    },
    updateProject: async (
      _: never,
      { id, project }: { id: string; project: ProjectArgs['project'] },
      { db }: { db: PoolClient }
    ) => {
      const { project_name, server_url } = project;
      const result = await db.query<ProjectType>(
        'UPDATE projects SET project_name=$1, server_url=$2 WHERE id=$3 RETURNING *;',
        [project_name, server_url, Number(id)]
      );
      const updatedProject = result.rows[0];
      return updatedProject;
    },
    changePassword: async (
      _: never,
      { userInput }: { userInput: ChangePasswordArgs },
      { db }: { db: PoolClient }
    ) => {
      const { username, oldPassword, newPassword } = userInput;
      // Check if there is a same username exists in the database. If not, throw error
      const dbResult = await db.query<UserType>(
        'SELECT * FROM users WHERE username = $1;',
        [username]
      );
      const existingUser = dbResult.rows[0];
      if (!existingUser) {
        throw new GraphQLError('Invalid username. User does not exist', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      // Verify password against hashed password in database
      // if success, change new password
      if (await bcrypt.compare(oldPassword, existingUser.password)) {
        // Encrypt password and Update database with new password
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);
        const result = await db.query<UserWithOnlyUsername>(
          'UPDATE users SET password = $1 WHERE username = $2 RETURNING username;',
          [newHashedPassword, username]
        );
        const updatedUser = result.rows[0];
        return updatedUser;
      } else {
        throw new GraphQLError(
          'Invalid password. Please provide correct password',
          {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          }
        );
      }
    },
    // delete all the metric logs related to a project when a project is deleted
    deleteHistoryLogs: async (
      _: never,
      { id }: HistoryLogIdArg,
      { db }: { db: PoolClient }
    ) => {
      const result = await db.query<HistoryLogType>(
        'DELETE FROM history_log WHERE project_id = $1 RETURNING *;',
        [Number(id)]
      );
      return result.rows;
    },
    deleteHistoryLogsDev: async (
      _: never,
      { id }: HistoryLogIdArg,
      { db }: { db: PoolClient }
    ) => {
      const result = await db.query<HistoryLogType>(
        'DELETE FROM history_log_dev WHERE project_id = $1 RETURNING *;',
        [Number(id)]
      );
      return result.rows;
    },
    deleteResolverLogsDev: async (
      _: never,
      { id }: { id: string },
      { db }: { db: PoolClient }
    ) => {
      const result = await db.query(
        'DELETE FROM resolver_log_dev WHERE project_id = $1 RETURNING *;',
        [Number(id)]
      );
      return result.rows;
    },
    deleteOperationResolverLogs: async (
      _: never,
      { id }: { id: string },
      { db }: { db: PoolClient }
    ) => {
      await db.query('DELETE FROM history_log_dev WHERE id = $1', [Number(id)]);
      const result = await db.query(
        'DELETE FROM resolver_log_dev WHERE operation_id = $1 RETURNING *;',
        [Number(id)]
      );
      return result.rows;
    },
  },
  User: {
    projects: async (
      { id: user_id, projects }: UserParentType,
      __: never,
      { db }: { db: PoolClient }
    ) => {
      const result = await db.query<ProjectType>(
        'SELECT * FROM projects WHERE user_id = $1 ORDER BY id;',
        [user_id]
      );
      return result.rows;
    },
  },
  Project: {
    user: async (
      { user_id }: ProjectParentType,
      __: never,
      { db }: { db: PoolClient }
    ) => {
      const result = await db.query<NonSensitiveUser>(
        'SELECT id, username FROM users WHERE id = $1',
        [user_id]
      );
      return result.rows[0];
    },
    history_log: async (
      { id: project_id }: ProjectParentType,
      __: never,
      { db }: { db: PoolClient }
    ) => {
      const result = await db.query<HistoryLogType>(
        'SELECT * FROM history_log WHERE project_id = $1',
        [project_id]
      );
      return result.rows;
    },
    history_log_dev: async (
      { id: project_id }: ProjectParentType,
      __: never,
      { db }: { db: PoolClient }
    ) => {
      const result = await db.query<HistoryLogType>(
        'SELECT * FROM history_log_dev WHERE project_id = $1 ORDER BY created_at;',
        [project_id]
      );
      return result.rows;
    },
  },
  Log: {
    project: async (
      { project_id }: { project_id: number },
      __: never,
      { db }: any
    ) => {
      const result = await db.query('SELECT * FROM projects WHERE id = $1', [
        project_id,
      ]);
      return result.rows[0];
    },
  },
};
