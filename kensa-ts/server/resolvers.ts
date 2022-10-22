export const resolvers = {
  Query: {
    // Get all users
    users: async (_: any, __: any, { db }: any, info: any) => {
      // Getting operation name of query
      // console.log(info.operation.name.value)
      const result = await db.query('SELECT * FROM users;');
      return result.rows;
    },
    // Get a single user by ID
    user: async (_: any, { id }: any, { db }: any, info: any) => {
      // Getting operation name of query
      // console.log(info.operation.name.value)
      const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows[0];
    },
    // Get all projects
    projects: async (_: any, __: any, { db }: any, info: any) => {
      const result = await db.query('SELECT * FROM projects;');
      return result.rows;
    },
    // Get a single project by ID
    project: async (_: any, { id }: any, { db }: any, info: any) => {
      const result = await db.query('SELECT * FROM projects WHERE id = $1', [id]);
      return result.rows[0];
    },
    // Get history log
    historyLog: async (_: any, __: any, { db }: any, info: any) => {
      const result = await db.query('SELECT * FROM history_log;');
      return result.rows;
    }

  },
  User: {
    projects: async ({ id: user_id }: any, __: any, { db }: any, info: any) => {
      const result = await db.query('SELECT * FROM projects WHERE user_id = $1', [user_id])
      return result.rows;
    }
  },
  Project: {
    user: async ({ user_id }: any, __: any, { db }: any, info: any) => {
      const result = await db.query('SELECT * FROM users WHERE id = $1', [user_id]);
      return result.rows[0];
    },
    history_log: async ({ id: project_id }: any, __: any, { db }: any, info: any) => {
      const result = await db.query('SELECT * FROM history_log WHERE project_id = $1', [project_id]);
      return result.rows;
    }
  },
  Log: {
    project: async({ project_id }: any, __: any, { db }: any, info: any) => {
      const result = await db.query('SELECT * FROM projects WHERE id = $1', [project_id]);
      return result.rows[0];
    }
  }
}