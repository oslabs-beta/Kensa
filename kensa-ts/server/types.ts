// Typescript types for server, GraphQL

export interface CreateUserArgs {
  username: string;
  password: string;
}

export interface ProjectArgs {
  project: {
    project_name: string;
    api_key?: string;
    server_url: string;
    userId?: string;
  }
}
