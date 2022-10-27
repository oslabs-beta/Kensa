import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { GraphQLRequestContext } from "apollo-server-types";
import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';

import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import db from "./models/db";
import { userController } from './controllers/userController';
import { appendFile } from "fs";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';

async function startApolloServer() {
  const app = express();
  const PORT = process.env.PORT || 3000

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  await apolloServer.start();

  // GraphQL logic
  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(apolloServer, {
    context: async ({req, res}: any) => {
      // check for req.cookies.token
      console.log(req.headers) 
      return {
        req,
        res,
        db,
      }
    },
  }))

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  
  // Express REST API routes
  app.use('/', cors(), express.static(path.join(__dirname, '../dist')));

  app.post('/login', userController.loginAuth, (req, res) => {
    res.status(200).json(res.locals.result);
  });

  app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
  });

  // the get '/*' request is required to get React router to work in production
  app.get('/*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
  });

  // global error handler

  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

}

startApolloServer();

