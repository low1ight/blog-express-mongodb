import {Request, Response} from "express";
import {authService} from "../../application/auth.service";
import {JwtRefreshTokenPayloadModel} from "../../models/jwt-refresh-token-payload-model";


export const logoutHandler = async (req: Request, res: Response) => {

    const {deviceId,userId} = req.user as JwtRefreshTokenPayloadModel;

    await authService.logout(deviceId, userId)

    res.sendStatus(204)

}