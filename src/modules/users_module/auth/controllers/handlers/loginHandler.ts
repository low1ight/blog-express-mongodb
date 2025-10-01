import {RequestWithBody} from "../../../../../common/types/RequestTypes";
import {Response} from "express";
import {LoginInputModel} from "../../models/login-input-model";
import {authService} from "../../application/auth.service";
import {Tokens} from "../../models/Tokens";

export const loginHandler = async (req: RequestWithBody<LoginInputModel>, res: Response) => {

    let ip = req.ip || 'unknown';

    const result:Tokens | null = await authService.login(req.body,ip)

    if (!result) {
        res.sendStatus(401)
        return
    }



    const [accessToken, refreshToken] = result

    res.cookie('refreshToken', refreshToken)

    res.status(201).json(accessToken)

}