import {Router} from "express";
import {jwtRefreshTokenAuthGuard} from "../../auth/guards/jwtRefreshToken.auth.guard";
import {getAllUserDevicesHandler} from "./handlers/getAllUserDevicesHandler";
import {deleteAllOtherUserDevices} from "./handlers/deleteAllOtherUserDevices";
import {deleteDeviceById} from "./handlers/deleteDeviceById";


export const deviceRouter = Router();


deviceRouter.get('/', jwtRefreshTokenAuthGuard ,getAllUserDevicesHandler)
deviceRouter.delete('/', jwtRefreshTokenAuthGuard ,deleteAllOtherUserDevices)
deviceRouter.delete('/:id', jwtRefreshTokenAuthGuard ,deleteDeviceById)