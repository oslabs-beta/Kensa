import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
// import { ApolloServerPlugin } from "apollo-server-plugin-base";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import testDb from './models/testDb';
// import { GraphQLRequestContext } from "apollo-server-types";
import { testPlugin, getContext } from 'kensa-api';

async function startApolloServer() {
  const app = express()
  const PORT = process.env.PORT || 3000

  // Keep this plugin here for now for testing purposes
  // const pluginOne = {
  //   // Fires whenever a GraphQL request is received from a client. This plugin runs after whatever happens in ApolloServer's context
  //   async requestDidStart(requestContext: any) {
  //     // IntrospectionQuery keeps running in GraphQL server. Use this condition to stop context from logging for IntrospectionQuery
  //     if (requestContext.request.operationName === 'IntrospectionQuery') return;
  //     // Query string request sent by the client
  //     // console.log(`Request started! Query: ${requestContext.request.query}`)
  //     // console.log(`Request variable! Variable: ${requestContext.request.variables}`)

  //     const requestStart = Date.now()
  //     let op: string;
  //     let success: boolean = true;
  //     return {
  //       async executionDidStart(executionRequestContext: any) {
  //         return {
  //           willResolveField({source, args, contextValue, info}: any) {
  //             const resolverStart = Date.now();
  //             return (error: any, result: any) => {
  //               const resolverEnd = Date.now();
  //               console.log(`Field ${info.parentType.name}.${info.fieldName} took ${resolverEnd - resolverStart}ms`)

  //               if (error) {
  //                 console.log(`It failed with ${error}`)
  //               } else {
  //                 console.log(`It returned ${result}`)
  //               }
  //             }
  //           }
  //         }
  //       },
  //       async didEncounterErrors() {
  //         success = false;
  //       },
  //       async willSendResponse(context: any) {
  //         const receiveResponse = Date.now()
  //         const elapsed = receiveResponse - requestStart;
  //         console.log(`operation=${op} duration=${elapsed}ms`);
  //         op = context.request.operationName;

  //         // Getting projectId from context object
  //         const { id } = context.contextValue.projectId;
  //         const query_string = context.request.query;
  //         // construct an object with metrics
  //         const metricBody = {
  //           query_string: query_string,
  //           execution_time: elapsed,
  //           success: success,
  //           operation_name: op
  //         }
  //         // This insert metrics to Kensa database
  //         await insertMetrics(metricBody, id);
  //       }
  //     }
  //   }
  // }

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [testPlugin]
  })

  await apolloServer.start();

  const api = 'bcdf2ec0-47ae-400b-8aeb-a4a78daf2f05';
  
  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(apolloServer, {
    // when referencing the database in resolvers, use 'db' when deconstructing context object
    context: async ({req, res}: any) => (await getContext({req, res}, api, testDb))
  }));
  
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

}

startApolloServer();

