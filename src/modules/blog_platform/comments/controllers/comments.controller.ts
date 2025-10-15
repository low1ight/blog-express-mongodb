import {Router} from "express";
import {getCommentByIdHandler} from "./handlers/getCommentByIdHandler";
import {validate} from "../../../../common/validator/validationHandler";
import {idParamValidator} from "../../../../common/validator/mongodb-id-validator";
import {deleteCommentByIdHandler} from "./handlers/deleteCommentByIdHandler";
import {jwtAccessTokenAuthGuard} from "../../../users_module/auth/guards/jwtAccessToken.auth.guard";
import {updateCommentByIdHandler} from "./handlers/updateCommentByIdHandler";
import {commentInputValidator} from "../validators/comment-input-validator";
import {setLikeStatusForCommentHandler} from "./handlers/setLikeStatusForCommentHandler";
import {likeForCommentInputValidator} from "../validators/likeForComment-input-validator";


export const commentsRouter = Router()


commentsRouter.get('/:id',validate(idParamValidator), getCommentByIdHandler)
commentsRouter.post('/:id/like-status',jwtAccessTokenAuthGuard, validate(idParamValidator,likeForCommentInputValidator), setLikeStatusForCommentHandler)
commentsRouter.delete('/:id',jwtAccessTokenAuthGuard,validate(idParamValidator), deleteCommentByIdHandler)
commentsRouter.put('/:id',jwtAccessTokenAuthGuard,validate(commentInputValidator,idParamValidator), updateCommentByIdHandler)