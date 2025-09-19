import {Router} from "express";
import {getCommentByIdHandler} from "./handlers/getCommentByIdHandler";
import {validate} from "../../../../common/validator/validationHandler";
import {idParamValidator} from "../../../../common/validator/mongodb-id-validator";
import {deleteCommentByIdHandler} from "./handlers/deleteCommentByIdHandler";
import {jwtAuthGuard} from "../../../users_module/auth/guards/jwt.auth.guard";


export const commentsRouter = Router()


commentsRouter.get('/:id',validate(idParamValidator), getCommentByIdHandler)
commentsRouter.delete('/:id',jwtAuthGuard,validate(idParamValidator), deleteCommentByIdHandler)