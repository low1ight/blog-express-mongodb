import {Router} from "express";
import {getUsersHandler} from "./handlers/getUsersHandler";
import {createUserHandler} from "./handlers/createUserHandler";
import {userInputValidator} from "../validators/create-users-input-validator";
import {validate} from "../../../../common/validator/validationHandler";
import {basicAuthGuard} from "../../auth/guards/basic.auth.guard";
import {deleteUserHandler} from "./handlers/deleteUserHandler";


export const userRouter = Router()


userRouter.get('/', getUsersHandler)
userRouter.post('/', basicAuthGuard, validate(userInputValidator), createUserHandler)
userRouter.delete('/:id', basicAuthGuard, deleteUserHandler)