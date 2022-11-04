import { Request, Response, NextFunction } from "express";
import path from "path";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/db';

export const userController = {
  loginAuth: (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    // encrypt  password
    // Build query
    const GET_PASSWORD = `SELECT * FROM users WHERE username = '${username}'`;
    // Talk to DB 
    db.query(GET_PASSWORD)
      .then((result: any) => {
        // console.log(result.rows);
        const user = result.rows[0];
        if(!user){
          // invoke global error handler
          res.locals.user = { username: '', token: '' };
          return next();
        }
        const truePassword = user.password;
        const token = jwt.sign({ username: user.username }, process.env.JWT_KEY);
        // res.cookie('token', token);
        res.locals.user = truePassword === password ? { username: user.username, token: token } : { username: '', token: '' };

        return next();
      });
  },
};