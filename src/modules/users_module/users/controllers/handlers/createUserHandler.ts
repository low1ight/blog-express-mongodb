import {Response} from "express";
import {RequestWithBody} from "../../../../../common/types/RequestTypes";
import {UserInputModel} from "../../models/user-input-model";
import {userService} from "../../application/user.service";

export const createUserHandler = async (req:RequestWithBody<UserInputModel>, res:Response) => {

   const result:string | null = await userService.createUser(req.body)


   if(!result){
       res.status(400).json('This Email is already in use')
   }

     res.status(201).json(result)

}