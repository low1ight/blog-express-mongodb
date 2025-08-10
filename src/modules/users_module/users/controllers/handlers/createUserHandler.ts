import {Response} from "express";
import {RequestWithBody} from "../../../../../common/types/RequestTypes";
import {UserInputModel} from "../../models/user-input-model";
import {userService} from "../../application/user.service";
import {userQueryRepository} from "../../repository/user.query.repository";

export const createUserHandler = async (req:RequestWithBody<UserInputModel>, res:Response) => {

   const result:string | null = await userService.createUser(req.body)


   if(!result){
       res.status(400).json('This Email is already in use')
       return
   }

   const user = await userQueryRepository.getUserById(result);

     res.status(201).json(user)

}