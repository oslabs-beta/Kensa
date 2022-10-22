import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import db from "./models/db";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // console.log('context from top level')
    return {
      db,
      startTime: Date.now()
    }
  },
})

server.listen().then(({url}) => {
  console.log(`Server runing on ${url}`)
})


// import express, { Request, Response } from 'express'
// import path from 'path'

// const app = express()
// const PORT = process.env.PORT || 3000

// app.use('/', express.static(path.join(__dirname, '../dist')))

// app.get('/age', (req: Request, res: Response): void => {
//   const age: number = 39;
//   res.json({ message: `I am ${age} years old` })
// })

// app.get('/hello', (req: Request, res: Response) => {
//   return res.status(200).json({ message: 'Hello! How are you?' })
// })

// app.listen(PORT, (): void => {
//   console.log(`Server listening on port: ${PORT}`)
// })

