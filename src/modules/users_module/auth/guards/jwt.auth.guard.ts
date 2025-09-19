import {Request, Response, NextFunction} from 'express'
import {jwtService} from "../application/jwt.service";
import {UserPayloadModel} from "../models/user-payload-model";

export const jwtAuthGuard = (req:Request , res:Response , next:NextFunction): void  => {

    const auth:string | undefined = req.headers['authorization'];


    if(!auth) {
        res.sendStatus(401);
        return
    }

    const [authType, token]:string[] = auth.split(' ');

    if(authType !== 'Bearer') {
        res.sendStatus(401);
        return
    }

    const payload:UserPayloadModel | null = jwtService.verify(token)

    if(!payload) {
        res.sendStatus(401);
        return
    }

    req.user =  payload
    next()

}