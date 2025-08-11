import {Response} from "express";
import {Id, RequestWithParam} from "../../../../../common/types/RequestTypes";
import {userService} from "../../application/user.service";

export const deleteUserHandler = async (req:RequestWithParam<Id>, res:Response) => {

   const result = await userService.deleteUser(req.params.id);

   if(!result) {
      res.status(404).send('User not found');
      return;
   }
   res.sendStatus(204)




}