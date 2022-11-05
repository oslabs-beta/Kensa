/* eslint-disable no-undef */
import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/db';

export const userController = {
  loginAuth: async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    
    // Build query
    const GET_USER = `SELECT * FROM users WHERE username = '${username}'`;
    // Talk to DB 
    const result = await db.query(GET_USER);
    const user = result.rows[0];

    // If no user exists in database, throw error
    if(!user){
      return res.status(400).json('Wrong username or password');
    }

    // Verify password against hashed password in database
    // if success, generate token and return to client
    if (await (bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ username: user.username }, process.env.JWT_KEY);
      res.locals.user = { username: user.username, token: token };
      next();
    } else {
      return res.status(400).json('Wrong username or password');
    }

    // db.query(GET_USER)
    //   .then((result: any) => {
    //     const user = result.rows[0];
    //     if(!user){
    //       // invoke global error handler
    //       res.locals.user = { username: '', token: '' };
    //       return next();
    //     }
    //     // const truePassword = user.password;
    //     const token = jwt.sign({ username: user.username }, process.env.JWT_KEY);
    //     // res.cookie('token', token);
    //     res.locals.user = truePassword === password ? { username: user.username, token: token } : { username: '', token: '' };

    //     return next();
    //   });
  },
};