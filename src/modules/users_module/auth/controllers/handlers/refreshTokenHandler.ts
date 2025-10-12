import {Request,Response} from "express";
import {authService} from "../../application/auth.service";
import {Tokens} from "../../models/Tokens";

export const refreshTokenHandler = async (req: Request, res: Response) => {

    const result:Tokens | null = await authService.refreshToken(req.cookies.refreshToken)

    if (!result) {
        res.sendStatus(401)
        return
    }

    const [accessToken, refreshToken] = result

    res.cookie('refreshToken', refreshToken)

    res.status(201).json(accessToken)

}