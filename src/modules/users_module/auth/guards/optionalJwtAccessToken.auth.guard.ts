import {Request, Response, NextFunction} from 'express'
import {jwtService} from "../application/jwt.service";
import {JwtAccessTokenPayloadModel} from "../models/jwt-access-token-payload-model";

export const optionalJwtAccessTokenAuthGuard = (req:Request , res:Response , next:NextFunction): void  => {

    const auth:string | undefined = req.headers['authorization'];


    if(!auth) {
        next()
        return;
    }

    const [authType, token]:string[] = auth.split(' ');

    if(authType !== 'Bearer') {
        next()
        return;
    }

    const payload:JwtAccessTokenPayloadModel | null = jwtService.verifyAccessToken(token)

    if(!payload) {
        next()
        return
    }

    req.user =  payload
    next()

}