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
          res.locals.result = { success: false, token: null };
          return next();
        }
        const truePassword = user.password;
        const token = jwt.sign({ username: user.username }, process.env.JWT_KEY);
        res.cookie('token', token);
        res.locals.result = truePassword === password ? { success: true, token: token } : { success: false, token: null };

        return next();
      });
  },
};