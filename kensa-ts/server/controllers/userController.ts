import { Request, Response, NextFunction } from "express";
import path from "path";


export const userController = {
    loginAuth: (req: Request, res: Response, next: NextFunction) => {
        res.locals.result = true;
        console.log(req.body);
        return next();
    },


}