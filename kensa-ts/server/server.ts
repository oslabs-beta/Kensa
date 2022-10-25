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


async function startApolloServer() {
  const app = express()
  const PORT = process.env.PORT || 3000

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  await apolloServer.start();

  // GraphQL logic
  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(apolloServer, {
    context: async ({req, res}: any) => {
      return {
        req,
        res,
        db,
      }
    },
  }))
  
  // Express REST API routes
  app.use('/', express.static(path.join(__dirname, '../dist')));

  app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
  });

  // the get '/*' request is required to get React router to work in production
  app.get('/*', (req, res) => {
      res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
  });

  // app.get('/login', (req, res) => {
  //   console.log('in login route')
  //   res.status(200).json({ username: 'brian', isLoggedIn: true })
  // })

  // app.get('/hello', (req, res) => {
  //   res.status(200).send('Hello from express')
  // })

  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

}

startApolloServer();

