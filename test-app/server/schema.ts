import { gql } from "apollo-server"

export const typeDefs = gql`
  type Query {
    projects: [Project]
    clients: [Client]
    project(id: ID!): Project
    client(id: ID!): Client
  }

  type Mutation {
    addClient(name: String!, email: String!, phone: String!): Client
    deleteClient(id: ID!): Client
    addProject(name: String!, description: String!, status: ProjectStatus = new, client: String): Project
    deleteProject(id: ID!): Project
    updateProject(id: ID!, name: String!, description: String!, status: ProjectStatus!): Project
  }

  type Project {
    id: ID!
    name: String!
    description: String
    status: String
    client: Client!
  }

  type Client {
    id: ID!
    name: String!
    email: String!
    phone: String!
  }

  enum ProjectStatus {
    new
    progress
    completed
  }
`

