import jwt, { JwtPayload } from 'jsonwebtoken';
import db from '../models/db';
import { UserWithOnlyUsername } from '../types';

export const getUser = async (token: string): Promise<UserWithOnlyUsername> => {
  // Decode the token to get user info and look up that user in database
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY) as JwtPayload;

    const result = await db.query<UserWithOnlyUsername>(
      'SELECT username FROM users WHERE username = $1',
      [decoded.username]
    );
    const user = result.rows[0];
    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Cannot get user from database');
    }
  }
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseUserField = (property: unknown): string => {
  if (!property || !isString(property)) {
    throw new Error('Incorrect or missing property');
  }
  return property;
};
