import {Request, Response, NextFunction} from 'express'
import {SETTINGS} from "../../../../settings";

export const basicAuthGuard = (req:Request , res:Response , next:NextFunction): void  => {

    const auth:string | undefined = req.headers['authorization'];


    if(!auth) {
        res.sendStatus(401);
        return
    }

    const [authType, authData]:string[] = auth.split(' ');
    const correctAuthData:string = Buffer.from(`${SETTINGS.AUTH.BASIC_AUTH_LOGIN}:${SETTINGS.AUTH.BASIC_AUTH_PASSWORD}`).toString('base64')

    if(authType !== 'Basic' || authData !== correctAuthData) {
        res.sendStatus(401);
        return
    }

     next()

}