import {Response} from "express";
import {RequestWithQuery} from "../../../../../common/types/RequestTypes";
import {UserQuery, UserQueryMapper} from "../../features/userQueryMapper";
import {userQueryRepository} from "../../repository/user.query.repository";
import {Paginator} from "../../../../../utils/paginator/paginator";
import {UserViewModel} from "../../models/user-view-model";

export const getUsersHandler = async (req:RequestWithQuery<UserQuery>, res:Response) => {

   const query = new UserQueryMapper(req.query);

   const users:Paginator<UserViewModel> = await userQueryRepository.getUsers(query);

   res.status(200).json(users);

}