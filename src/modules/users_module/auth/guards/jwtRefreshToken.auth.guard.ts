import {Request, Response, NextFunction} from 'express'
import {jwtService} from "../application/jwt.service";
import {JwtRefreshTokenPayloadModel} from "../models/jwt-refresh-token-payload-model";
import {devicesService} from "../../devices/application/devices.service";

export const jwtRefreshTokenAuthGuard = async (req:Request , res:Response , next:NextFunction)  => {


    if(!req.cookies.refreshToken) {
        res.sendStatus(401);
        return
    }

    const payload:JwtRefreshTokenPayloadModel | null = jwtService.verifyRefreshToken(req.cookies.refreshToken)



    if(!payload) {
        res.status(401).json('Invalid token was expired')
        return
    }

    const currentDevice = await devicesService.getDeviceById(payload.deviceId)

    if(!currentDevice) {
        res.status(401).json('Invalid token was expired')
        return
    }

    if(currentDevice.sessionCode !== payload.deviceSessionCode) {
        res.status(401).json('refresh token was expired')
        return
    }

    req.user = payload
    next()

}