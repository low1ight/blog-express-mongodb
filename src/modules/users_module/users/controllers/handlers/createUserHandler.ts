import {Response} from "express";
import {RequestWithBody} from "../../../../../common/types/RequestTypes";
import {UserInputModel} from "../../models/user-input-model";
import {userService} from "../../application/user.service";
import {userQueryRepository} from "../../repository/user.query.repository";
import {toHttpCode} from "../../../../../utils/customResponse/toHttpCode";
import {CustomResponse} from "../../../../../utils/customResponse/customResponse";

export const createUserHandler = async (req:RequestWithBody<UserInputModel>, res:Response) => {

   const result:CustomResponse<string> = await userService.createUser(req.body)


   if(!result.isSuccessful){
       res.status(toHttpCode(result.errStatusCode)).json(result.content)
       return
   }

   const user = await userQueryRepository.getUserById(result.content!);

     res.status(201).json(user)

}