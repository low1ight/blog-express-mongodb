import {RequestWithBody} from "../../../../../common/types/RequestTypes";
import {Response} from "express";
import {authService} from "../../application/auth.service";
import {NewPasswordInputModel} from "../../models/newPassword-input-model";
import {toHttpCode} from "../../../../../utils/customResponse/toHttpCode";
import {CustomResponse} from "../../../../../utils/customResponse/customResponse";

export const newPasswordHandler = async (req: RequestWithBody<NewPasswordInputModel>, res: Response) => {


    const response:CustomResponse<string> = await authService.setNewPasswordByRecoveryCode(req.body)

    if(!response.isSuccessful){
        res.status(toHttpCode(response.errStatusCode)).json(response.content)
        return
    }

    res.sendStatus(204)

}