import {Response} from "express";
import {devicesService} from "../../application/devices.service";
import {JwtRefreshTokenPayloadModel} from "../../../auth/models/jwt-refresh-token-payload-model";
import {Id, RequestWithParam} from "../../../../../common/types/RequestTypes";
import {CustomResponse} from "../../../../../utils/customResponse/customResponse";
import {toHttpCode} from "../../../../../utils/customResponse/toHttpCode";


export const deleteDeviceById = async (req: RequestWithParam<Id>, res: Response) => {
    const {userId} = req.user as JwtRefreshTokenPayloadModel;

    const result: CustomResponse<string> = await devicesService.deleteDeviceById(req.params.id, userId)

    if (!result.isSuccessful) {
        res.sendStatus(toHttpCode(result.errStatusCode))
        return
    }

    res.sendStatus(204)


}