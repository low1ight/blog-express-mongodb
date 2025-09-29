import {Response} from "express";
import {CustomResponse} from "../../../../../utils/customResponse/customResponse";
import {RequestWithBody} from "../../../../../common/types/RequestTypes";
import {toHttpCode} from "../../../../../utils/customResponse/toHttpCode";
import {authService} from "../../application/auth.service";
import {EmailCodeResendingInputModel} from "../../models/emailCodeResending-input-model";

export const emailRegistrationCodeResendingHandler = async (req:RequestWithBody<EmailCodeResendingInputModel>, res:Response) => {

     const response:CustomResponse<string> = await authService.emailCodeResending(req.body);

     if(!response.isSuccessful){
          res.status(toHttpCode(response.errStatusCode)).json(response.content)
          return
     }


     res.sendStatus(204)

}