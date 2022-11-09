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
import { kensaPlugin, getContext, insertMetrics, insertMetricsDev, insertResolverMetric } from 'kensa-npm';

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

  //     // console.log('finding header', requestContext.contextValue.res.req.rawHeaders);
  //     const headers:string[] = requestContext.contextValue.res.req.rawHeaders;
  //     const devmode:string = headers[headers.indexOf('Devmode') + 1];
  //     // console.log('devmode', devmode)

  //     const requestStart = Date.now()
  //     let op: string;
  //     let success: boolean = true;
  //     return {
  //       async executionDidStart(executionRequestContext: any) {
  //         // console.log(executionRequestContext)
  //         return {
  //           willResolveField({source, args, contextValue, info}: any) {
  //             const resolverStart = Date.now();
  //             return (error: any, result: any) => {
  //               let success;
  //               const resolverEnd = Date.now();
  //               console.log(`Field ${info.parentType.name}.${info.fieldName} took ${resolverEnd - resolverStart}ms`)

  //               if (error) {
  //                 console.log(`It failed with ${error}`);
  //                 success = false;
  //               } else {
  //                 console.log(`It returned ${result}`);
  //                 success = true;
  //               }

  //               // resolver_name, project_id, execution_time, operation_id, success
  //               const resolverMetric = {
  //                 query_string: `${info.parentType.name}.${info.fieldName}`,
  //                 execution_time: resolverEnd - resolverStart,
  //                 success: success
  //               }
  //               info.operation.directives.push(resolverMetric);
  //               // console.log(info.operation.directives);
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

  //         // In case if Apollo context object doesn't pick up operation name,
  //         // parse it from the query string
  //         if (!op) {
  //           const queryStr = context.request.query;
  //           let operationName = queryStr.substring(queryStr.indexOf(' '), queryStr.indexOf('{')).trim();
  //           if (operationName.length < 1) {
  //             operationName = 'Null';
  //           }
  //           op = operationName;
  //         }

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

  //         // check for dev mode
  //         if (devmode === 'true') {
  //           console.log(metricBody);
  //           // THis insert metrics to Kensa database dev table
  //           const result = await insertMetricsDev(metricBody, id);

  //           const operation_id = result.id;
  //           console.log('operation_id: ', typeof operation_id);
  //           console.log('willSendResponse context', context.operation.directives);
  //           console.log('willSendResponse context', Array.isArray(context.operation.directives));
  //         } else {
  //           // This insert metrics to Kensa database
  //           const result = await insertMetrics(metricBody, id);
  //           console.log('insertMetricResult: ', result);
  //         }
  //       }
  //     }
  //   }
  // }

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [kensaPlugin]
    // plugins: [pluginOne]
  }); 

  await apolloServer.start();

  // Kensa test-app id=1, user_id=1 (brian)
  const api = 'f1d275e5-5557-4aa0-bb29-ebd0ab871cf2';
  
  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(apolloServer, {
    // when referencing the database in resolvers, use 'db' when deconstructing context object
    context: async ({req, res}: any) => (await getContext({req, res}, api, testDb))
    // context: async ({req, res}: any) => {console.log('Request object in context', req.rawHeaders); return await getContext({req, res}, api, testDb)}
  }));
  
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

}

startApolloServer();

