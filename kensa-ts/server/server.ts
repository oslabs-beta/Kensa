// import { ApolloServer } from "apollo-server";
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
  const httpServer = http.createServer(app)

  // Testing with plugin
  // const pluginOne = {
  //   // Fires whenever a GraphQL request is received from a client
  //   async requestDidStart(requestContext: any) {
  //     // console.log(requestContext.request.operationName)
  //     // console.log(`Request started! Query: ${requestContext.request.query}`)
  //     const start = Date.now()
  //     let op: string
  //     return {
  //       async executionDidStart(executionRequestContext: any) {
  //         return {
  //           willResolveField({source, args, contextValue, info}: any) {
  //             const start = Date.now();
  //             return (error: any, result: any) => {
  //               const end = Date.now();
  //               console.log(`Field ${info.parentType.name}.${info.fieldName} took ${end - start}ms`)
  //               if (error) {
  //                 console.log(`It failed with ${error}`)
  //               } else {
  //                 console.log(`It returned ${result}`)
  //               }
  //             }
  //           }
  //         }
  //       },
  //       async didResolveOperation(context: any) {
  //         // console.log(context.contextValue)
  //         op = context.operationName
  //       },
  //       async willSendResponse(context: any) {
  //         if (op === 'IntrospectionQuery') return;
  //         // console.log(context.response.body.singleResult) // response data
  //         // console.log(context) // response data
  //         // console.log(context.document)
  //         const stop = Date.now()
  //         const elapsed = stop - start
  //         console.log(`operation=${op} duration=${elapsed}ms`)
  //         // const result = await db.query('SELECT * FROM projects WHERE id = $1', [1])
  //         // console.log(result.rows)
  //       }
  //     }
  //   }
  // }

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    // plugins: [ApolloServerPluginDrainHttpServer({httpServer}), pluginOne],
  })

  await apolloServer.start();

  // GraphQL logic
  // Testing with plugin, need to refactor later
  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(apolloServer, {
    context: async ({req, res}: any) => {
      if (req.body.operationName === 'IntrospectionQuery') return;
      console.log(req.body.operationName);
      // const user = await db.query('SELECT * FROM users WHERE id = $1', [1])
      return {
        req,
        res,
        db,
        // startTime: Date.now(),
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

