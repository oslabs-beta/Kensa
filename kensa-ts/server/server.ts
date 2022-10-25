import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import db from "./models/db";
// import { GraphQLRequestContext } from "apollo-server-types";

async function startApolloServer() {
  const app = express()
  const PORT = process.env.PORT || 3000

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  await apolloServer.start();

  // Express REST API route
  app.get('/login', (req, res) => {
    console.log('in login route')
    res.status(200).json({ username: 'brian', isLoggedIn: true })
  })

  app.get('/hello', (req, res) => {
    res.status(200).send('Hello from express')
  })
  
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
  
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

}

startApolloServer();

