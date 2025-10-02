import {Request, Response, NextFunction} from 'express'
import {jwtService} from "../application/jwt.service";
import {JwtAccessTokenPayloadModel} from "../models/jwt-access-token-payload-model";

export const jwtRefreshTokenAuthGuard = (req:Request , res:Response , next:NextFunction): void  => {


    if(!req.cookies.refreshToken) {
        res.sendStatus(401);
        return
    }

    const payload:JwtAccessTokenPayloadModel | null = jwtService.verifyRefreshToken(req.cookies.refreshToken)

    if(!payload) {
        res.sendStatus(401);
        return
    }

    req.user =  payload
    next()

}