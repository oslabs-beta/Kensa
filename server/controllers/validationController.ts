import db from '../models/db';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

export const validationController = {
getID: (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;
  const user = jwt.verify(token, process.env.JWT_KEY);
  console.log(user);
  // make user_id dynamic
  const text = `SELECT id FROM "users" WHERE username='${user}'`;

  db.query(text)
    .then((result: any) => {
      console.log(result.rows[0]);
      res.locals.id = result.rows[0];
      return next();
    })
    .catch((e: any) => next(e));
},
};;

module.exports = validationController;