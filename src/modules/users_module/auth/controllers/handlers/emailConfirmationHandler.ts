import {Response} from "express";
import {CustomResponse} from "../../../../../utils/customResponse/customResponse";
import {RequestWithBody} from "../../../../../common/types/RequestTypes";
import {toHttpCode} from "../../../../../utils/customResponse/toHttpCode";
import {authService} from "../../application/auth.service";
import {EmailConfirmationInputModel} from "../../models/emailConfirmation-input-model";

export const emailConfirmationHandler = async (req:RequestWithBody<EmailConfirmationInputModel>, res:Response) => {

     const response:CustomResponse<string> = await authService.emailConfirmation(req.body.code);

     if(!response.isSuccessful){
          res.status(toHttpCode(response.errStatusCode)).json(response.content)
          return
     }


     res.sendStatus(204)

}