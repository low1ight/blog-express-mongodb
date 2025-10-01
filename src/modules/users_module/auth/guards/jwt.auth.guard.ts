import {Request, Response, NextFunction} from 'express'
import {jwtService} from "../application/jwt.service";
import {JwtAccessTokenPayloadModel} from "../models/jwt-access-token-payload-model";

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

    const payload:JwtAccessTokenPayloadModel | null = jwtService.verifyAccessToken(token)

    if(!payload) {
        res.sendStatus(401);
        return
    }

    req.user =  payload
    next()

}