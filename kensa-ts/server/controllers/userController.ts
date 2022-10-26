import { Request, Response, NextFunction } from "express";
import path from "path";

import db from '../models/db';

export const userController = {
    loginAuth: (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body;
        // encrypt  password 
        // Build query
        const GET_PASSWORD = `SELECT password FROM users WHERE username = '${username}'`;
        // Talk to DB 
        db.query(GET_PASSWORD)
        .then((result: any) => {
            // console.log(res.rows[0].password);
            if(!result.rows[0]){
                res.locals.result = false;
                return next()
            }
            const truePassword = result.rows[0].password;
            res.locals.result = truePassword === password ? true : false;
            return next();
        })
        // res.locals.result = true;
        // return next();
    },
};