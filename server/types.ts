// Typescript types for server, GraphQL
import { Response } from 'express';

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

export interface UserType {
  id: string;
  username: string;
  password: string;
}

export type UserFields = Omit<UserType, 'id'>;

interface Locals extends Record<string, any> {
  user: { username: string; token: string };
}

export interface MyResponse extends Response {
  locals: Locals;
}
