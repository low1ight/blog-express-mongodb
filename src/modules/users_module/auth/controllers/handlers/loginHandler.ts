import {RequestWithBody} from "../../../../../common/types/RequestTypes";
import {Response} from "express";
import {LoginInputModel} from "../../models/login-input-model";
import {authService} from "../../application/auth.service";

export const loginHandler = async (req:RequestWithBody<LoginInputModel>, res:Response) => {

     const result = await authService.login(req.body)

    if(!result) {
        res.sendStatus(401)
        return
    }

     res.sendStatus(204)

}