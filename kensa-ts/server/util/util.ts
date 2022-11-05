import jwt from 'jsonwebtoken';
import db from '../models/db';

export const getUser = async (token: string) => {
  // Decode the token to get user info and look up that user in database
  const decoded: any = jwt.verify(token, process.env.JWT_KEY);

  const result = await db.query('SELECT username FROM users WHERE username = $1', [decoded.username]);

  const user = result.rows[0];
  return user;
};