import {Response} from "express";
import {CustomResponse} from "../../../../../utils/customResponse/customResponse";
import {RequestWithBody} from "../../../../../common/types/RequestTypes";
import {UserInputModel} from "../../../users/models/user-input-model";
import {toHttpCode} from "../../../../../utils/customResponse/toHttpCode";
import {authService} from "../../application/auth.service";

export const registrationHandler = async (req:RequestWithBody<UserInputModel>, res:Response) => {

     const response:CustomResponse<string> = await authService.registration(req.body);

     if(!response.isSuccessful){
          res.status(toHttpCode(response.errStatusCode)).json(response.content)
          return
     }


     res.sendStatus(204)

}