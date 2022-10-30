import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4'
// import { ApolloServerPlugin } from "apollo-server-plugin-base";
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import testDb from './models/testDb'
// import { GraphQLRequestContext } from "apollo-server-types";
import { getProjectId, insertMetrics } from 'kensa-api';


async function startApolloServer() {
  const app = express()
  const PORT = process.env.PORT || 3000

  // Move plugins to npm package later
  const pluginOne = {
    // Fires whenever a GraphQL request is received from a client. This plugin runs after whatever happens in ApolloServer's context
    async requestDidStart(requestContext: any) {
      // IntrospectionQuery keeps running in GraphQL server. Use this condition to stop context from logging for IntrospectionQuery
      if (requestContext.request.operationName === 'IntrospectionQuery') return;
      // Query string request sent by the client
      // console.log(`Request started! Query: ${requestContext.request.query}`)
      // console.log(`Request variable! Variable: ${requestContext.request.variables}`)

      const requestStart = Date.now()
      let op: string
      return {
        async executionDidStart(executionRequestContext: any) {
          return {
            willResolveField({source, args, contextValue, info}: any) {
              const resolverStart = Date.now();
              return (error: any, result: any) => {
                const resolverEnd = Date.now();
                console.log(`Field ${info.parentType.name}.${info.fieldName} took ${resolverEnd - resolverStart}ms`)

                if (error) {
                  console.log(`It failed with ${error}`)
                } else {
                  console.log(`It returned ${result}`)
                }
              }
            }
          }
        },
        async didResolveOperation(context: any) {
          // context ==> { logger, cache, schema, request, response, contextValue, metrics, overallCachePolicy, queryHash, source, document }
          op = context.operationName
        },
        async willSendResponse(context: any) {
          // console.log(context.response.body.singleResult) // response data
          const receiveResponse = Date.now()
          const elapsed = receiveResponse - requestStart
          console.log(`operation=${op} duration=${elapsed}ms`)

          // Getting projectId from context object
          const { id } = context.contextValue.projectId;
          const query_string = context.request.query;
          // construct a fake response for now
          const fakeResponse = {
            query_string: query_string,
            execution_time: elapsed,
            success: true
          }
          // This insert metrics to Kensa database
          await insertMetrics(fakeResponse, id);
        }
      }
    }
  }

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [pluginOne]
  })

  await apolloServer.start();
  
  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(apolloServer, {
    context: async ({req, res}: any) => {
      // IntrospectionQuery keeps running. Use this to stop context from logging for IntrospectionQuery
      if (req.body.operationName === 'IntrospectionQuery') return;
      console.log('inside context ApolloServer test-app')
      console.log(req.body)
      // insert your apiKey here
      const apiKey = 'a1b2c3d4e5f6g7h8i9j10';
      // Calling npm package to get projectId
      const projectId = await getProjectId(apiKey)
      return {
        req,
        res,
        testDb,
        projectId
      }
    },
  }))
  
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

}

startApolloServer();

