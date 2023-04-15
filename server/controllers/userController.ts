import { Request, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/db';
import { UserType, MyResponse } from '../types';
// import { parseUser } from '../util/util';

export const userController = {
  loginAuth: async (req: Request, res: MyResponse, next: NextFunction) => {
    const { username, password }: { username: string; password: string } =
      req.body;

    const result = await db.query<UserType>(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    const user = result.rows[0];

    // If no user exists in database, throw error
    if (!user) {
      return res.status(400).json('Wrong username or password');
    }

    // Verify password against hashed password in database
    // if success, generate token and return to client
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username: user.username }, process.env.JWT_KEY, {
        expiresIn: '1h',
      });
      res.locals.user = { username: user.username, token: token };
      next();
    } else {
      return res.status(400).json('Wrong username or password');
    }
  },
};
