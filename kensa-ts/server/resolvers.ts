import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// mongodb migration test
import { User, Project, HistoryLog, HistoryLogDev } from './models/mongoSchemas';
import mongoose, { Types } from 'mongoose';
const ObjectId = Types.ObjectId;
import Projects from '../src/components/Projects';
import { stringify } from 'querystring';

export const resolvers = {
  Query: {
    // Get all users
    users: async (_: any, __: any, { db }: any, info: any) => {
      // const result = await db.query('SELECT * FROM users;');
      // return result.rows;
      return await User.find();
    },
    // Get a single user by ID
    user: async (_: any, { id }: any, { db }: any, info: any) => {
      // const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
      // return result.rows[0];
      return await User.findById(id);
    },
    // Get a single user by username
    username: async (_: any, { username }: any, { db }: any, info: any) => {
      // const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
      // return result.rows[0];
      return await User.findOne({username:username});
    },
    // Get all projects
    projects: async (_: any, __: any, { db }: any, info: any) => {
      // const result = await db.query('SELECT * FROM projects;');
      // return result.rows;
      // return await Project.find();
      Project.find({'user_id': '6368b24b4305380079f0d88f'}, function (err:any, docs:any) {
        console.log(docs);
      });
      // console.log(result)
      // return result;
    },
    // Get a single project by ID
    project: async (args: any, { id }: any, { db }: any, info: any) => {
      // const result = await db.query('SELECT * FROM projects WHERE id = $1', [args.id]);
      // return result.rows[0];
      return await Project.findById(id);
    },
    // A history log of every project registered with Kensa
    historyLog: async (_: any, __: any, { db }: any, info: any) => {
      // const result = await db.query('SELECT * FROM history_log;');
      // return result.rows;
      return await HistoryLog.find();
    },
    historyLogDev: async (_: any, __: any, { db }: any) => {
      // const result = await db.query('SELECT * FROM history_log_dev;');
      // return result.rows;
      return await HistoryLogDev.find();
    },
  },
  Mutation: {
    addProject: async (_: any, { project_name, api_key, server_url, user }: any, { db }: any) => {
      // const result = await db.query('INSERT INTO projects(project_name, api_key, server_url, user_id) VALUES($1, $2, $3, $4) RETURNING *;', [project_name, api_key, server_url, user]);
      // return result.rows[0];
      // console.log(project_name, ' ', api_key, ' ', server_url, ' ', user);
      const newProject = new Project({ project_name, api_key, server_url, user_id: user });
      const result = await newProject.save();
      return result;
    },
    deleteProject: async (_: any, { id }: any, { db }: any) => {
      // const result = await db.query('DELETE FROM projects WHERE id = $1 RETURNING *;', [id]);
      // return result.rows[0];
      const result = await Project.findByIdAndDelete(id);
      return result;
    },
    createUser: async (_: any, { username, password }: any, { db }: any) => {
      // Check if there is a same username exists in the database. If yes, throw error
      const dbResult = await db.query('SELECT username FROM users WHERE username = $1', [username]);
      const existingUser = dbResult.rows[0];
      if (existingUser) {
        throw new GraphQLError('Please choose different username', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Insert new user into database
      await db.query('INSERT INTO users(username, password) VALUES($1, $2) RETURNING username;', [username, hashedPassword]);
      // Create token to send back to client
      const token = jwt.sign({ username: username }, process.env.JWT_KEY);

      return { username, token };
    },
  },
  User: {
    projects: async (args: any, __: any, { db }: any, info: any) => {
      // const result = await db.query('SELECT * FROM projects WHERE user_id = $1', [user_id]);
      // return result.rows;
      // console.log(user_id)
      // return await Project.find({user_id});
      const userId = args._id.toString();
      console.log(userId)
      // const result = await Project.find({user_id: args._id});
      const result = await Project.find({'user_id': userId},);
      // console.log(result)
      return result;
    }
  },
  Project: {
    user: async (args: any, { id }: any, { db }: any, info: any) => {
      // const result = await db.query('SELECT * FROM users WHERE id = $1', [user_id]);
      // return result.rows[0];
      console.log(args)
      return await User.findById(args.user_id);
    },
    history_log: async (args: any, __: any, { db }: any, info: any) => {
      // const result = await db.query('SELECT * FROM history_log WHERE project_id = $1', [project_id]);
      // return result.rows;
      // console.log('hi', args)
      const projectId = args._id.toString();
      const result = await HistoryLog.find({project_id: projectId});
      console.log(result)
      return result;
    },
    history_log_dev: async ({ id: project_id }: any, __: any, { db }: any) => {
      // const result = await db.query('SELECT * FROM history_log_dev WHERE project_id = $1', [project_id]);
      // return result.rows;
      const result = await HistoryLog.find({project_id});
      return result;
    }
  },
  Log: {
    project: async({ project_id }: any, __: any, { db }: any, info: any) => {
      // const result = await db.query('SELECT * FROM projects WHERE id = $1', [project_id]);
      // return result.rows[0];

      return await Project.findById(project_id);
    }
  }
};