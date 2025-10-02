import {Request, Response} from "express";

import {devicesService} from "../../application/devices.service";
import {JwtRefreshTokenPayloadModel} from "../../../auth/models/jwt-refresh-token-payload-model";


export const deleteAllOtherUserDevices = async (req: Request, res: Response) => {
    const {deviceId,userId} = req.user as JwtRefreshTokenPayloadModel;

     await devicesService.deleteOtherDevices(deviceId,userId)

    res.sendStatus(204)


}