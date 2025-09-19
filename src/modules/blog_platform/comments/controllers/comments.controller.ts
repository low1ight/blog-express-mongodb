import {Router} from "express";
import {getCommentByIdHandler} from "./handlers/getCommentByIdHandler";
import {validate} from "../../../../common/validator/validationHandler";
import {idParamValidator} from "../../../../common/validator/mongodb-id-validator";


export const commentsRouter = Router()


commentsRouter.get('/:id',validate(idParamValidator), getCommentByIdHandler)
commentsRouter.delete('/:id',validate(idParamValidator), getCommentByIdHandler)