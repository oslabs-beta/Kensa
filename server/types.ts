// Typescript types for server, GraphQL
import { Response, Request } from 'express';

export interface UserType {
  id: string;
  username: string;
  password: string;
}

export type UserIdArg = Omit<UserType, 'username' | 'password'>;

export type UserUsernameArg = Omit<UserType, 'id' | 'password'>;

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
  };
}

export interface ChangePasswordArgs {
  username: string;
  oldPassword: string;
  newPassword: string;
}

export type UserFields = Omit<UserType, 'id'>;

export type NonSensitiveUser = Omit<UserType, 'password'>;

export type UserWithOnlyUsername = UserUsernameArg;

export interface ProjectType {
  id: number;
  project_name: string;
  api_key: string;
  server_url: string;
  user_id: number;
}

export interface HistoryLogType {
  id: number;
  operation_name: string;
  query_string: string;
  size: number;
  execution_time: number;
  project_id: number;
  created_at?: string;
  success: boolean;
}

interface Locals extends Record<string, any> {
  user: { username: string; token: string };
}

export interface MyResponse extends Response {
  locals: Locals;
}

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    username: string;
  }
}

// export interface DbType {
//   collect: string;
// }

// export interface MyContextType {
//   req: Request;
//   res: Response;
//   db: DbType;
//   user: UserWithOnlyUsername;
// }
