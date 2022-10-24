import { start } from "repl";

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
      // console.log(req)
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
    project: async (parent: any, args: any, { db }: any, info: any) => {
      // console.log(req.body.query)   // logging out query string sent from frontend
      // console.log(req.body?.operationName ? req.body.operationName : 'Operation Name is not defined by client')    // logging operation name
      // console.log(req.headers.token)
      // console.log(context)
      // console.log(info.returnType)
      // console.log('inside project resolver startTime', context.startTime)
      const result = await db.query('SELECT * FROM projects WHERE id = $1', [args.id]);
      // const end = Date.now();
      // console.log('inside project resolver endTime', end)
      // console.log(end - context.startTime)
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
      // console.log('inside history_log resolver', startTime)
      const result = await db.query('SELECT * FROM history_log WHERE project_id = $1', [project_id]);
      // const end = Date.now();
      // console.log('inside history_log resolver endTime', end)
      // console.log(end - startTime)
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