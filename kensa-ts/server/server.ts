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
      return {
        req,
        res,
        db,
      };
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

  // app.post('/testjwt', (req, res) => {
  //   const { token } = req.body;
  //   const username = jwt.verify(token, process.env.JWT_KEY);
  //   console.log('from testjwt endpoint USERNAME: ', username);
  //   res.status(200).json({ username: username });
  // });

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

