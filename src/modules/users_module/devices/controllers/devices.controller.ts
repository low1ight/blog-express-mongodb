import {Router} from "express";
import {jwtRefreshTokenAuthGuard} from "../../auth/guards/jwtRefreshToken.auth.guard";
import {getAllUserDevicesHandler} from "./handlers/getAllUserDevicesHandler";
import {deleteAllOtherUserDevices} from "./handlers/deleteAllOtherUserDevices";
import {deleteDeviceById} from "./handlers/deleteDeviceById";
import {validate} from "../../../../common/validator/validationHandler";
import {idParamValidator} from "../../../../common/validator/mongodb-id-validator";


export const deviceRouter = Router();


deviceRouter.get('/', jwtRefreshTokenAuthGuard ,getAllUserDevicesHandler)
deviceRouter.delete('/', jwtRefreshTokenAuthGuard ,deleteAllOtherUserDevices)
deviceRouter.delete('/:id', jwtRefreshTokenAuthGuard, validate(idParamValidator) ,deleteDeviceById)