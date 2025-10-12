import {Response} from "express";
import {RequestWithBody} from "../../../../../common/types/RequestTypes";
import {authService} from "../../application/auth.service";
import {PasswordRecoveryInputModel} from "../../models/passwordRecovery-input-model";

export const passwordRecoveryHandler = async (req:RequestWithBody<PasswordRecoveryInputModel>, res:Response) => {

     await authService.passwordRecovery(req.body.email);

     res.sendStatus(204)

}