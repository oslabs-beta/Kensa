import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import testDb from './models/testDb';
import { kensaPlugin, getContext} from 'kensats';

async function startApolloServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  // Start new apollo server 
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [kensaPlugin]
  }); 

  await apolloServer.start();

  const api = '65b00bbe-3b3b-4fea-8d3f-de3a84338914';
  
  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(apolloServer, {
    // when referencing the database in resolvers, use 'db' when deconstructing context object
    context: async ({req, res}: any) => (await getContext({req, res}, api, testDb))
  }));
  
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

}

startApolloServer();

