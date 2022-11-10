/* eslint-disable no-undef */
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import db from "./models/db";
import { userController } from './controllers/userController';
import cookieParser from "cookie-parser";
import { getUser } from './util/util';

async function startApolloServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  // GraphQL logic
  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(apolloServer, {
    context: async ({req, res}: any) => {
    // get the user token from the headers
      const token = req.headers.authorization.split(' ')[1] || '';

      // // try to retrieve a user with the token
      const user = await getUser(token);

      // // add the user to the context
      return { req, res, db, user };
    },
  }));

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  
  // Express REST API routes
  app.use('/', cors(), express.static(path.join(__dirname, '../dist')));

  app.post('/login', userController.loginAuth, (req: Request, res: Response) => {
    return res.status(200).json(res.locals.user);
  });

  app.post('/getId', async (req: Request, res: Response) => {
    const { apiKey } = req.body;

    const result = await db.query('SELECT id FROM projects WHERE api_key = $1', [apiKey]);

    return res.status(200).json(result.rows[0]);
  });

  app.post('/metrics', async (req: Request, res: Response) => {
    // Request body received from npm package
    const { projectId, query_string, operation_name, execution_time, success } = req.body;

    // // Insert operation metrics (production) to table
    const result = await db.query('INSERT INTO history_log(query_string, project_id, execution_time, success, operation_name) VALUES($1, $2, $3, $4, $5) RETURNING *;', [query_string, projectId, execution_time, success, operation_name]);

    return res.status(200).json(result.rows[0]);
  });

  app.post('/devmetrics', async (req: Request, res: Response) => {
    // // Request body received from npm package
    const { projectId, query_string, operation_name, execution_time, success } = req.body;

    // // Insert operation metrics (development) to table
    const result = await db.query('INSERT INTO history_log_dev(query_string, project_id, execution_time, success, operation_name) VALUES($1, $2, $3, $4, $5) RETURNING *;', [query_string, projectId, execution_time, success, operation_name]);

    return res.status(200).json(result.rows[0]);
  });

  app.get('/', (req: Request, res: Response) => {
    return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
  });

  // the get '/*' request is required to get React router to work in production
  app.get('/*', (req: Request, res: Response) => {
    return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
  });


  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

startApolloServer();

