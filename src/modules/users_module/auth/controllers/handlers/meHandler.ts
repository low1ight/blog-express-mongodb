import {Request,Response} from "express";
import {authService} from "../../application/auth.service";

export const meHandler = async (req:Request, res:Response) => {

    const user = await authService.me(req.user.id)

    if(!user) {
        res.sendStatus(404)
        return
    }

     res.status(201).json(user)

}