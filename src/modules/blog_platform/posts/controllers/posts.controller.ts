import {Router} from "express";
import {validate} from "../../../../common/validator/validationHandler";
import {postInputValidator} from "../vlidators/post-input-validator";
import {basicAuthGuard} from "../../../users_module/auth/guards/basic.auth.guard";
import {idParamValidator} from "../../../../common/validator/mongodb-id-validator";
import {getPostsHandler} from "./handlers/getPostsHandler";
import {getPostByIdHandler} from "./handlers/getPostByIdHandler";
import {createPostHandler} from "./handlers/createPostHandler";
import {updatePostHandler} from "./handlers/updatePostHandler";
import {deletePostHandler} from "./handlers/deletePostHandler";
import {createPostCommentHandler} from "./handlers/createPostCommentHandler";
import {commentInputValidator} from "../../comments/validators/comment-input-validator";
import {jwtAuthGuard} from "../../../users_module/auth/guards/jwt.auth.guard";



export const postsRouter = Router()


postsRouter.get('/', getPostsHandler)

postsRouter.get('/:id',validate(idParamValidator), getPostByIdHandler)

postsRouter.post('/',basicAuthGuard,validate(postInputValidator), createPostHandler)

postsRouter.put('/:id',basicAuthGuard,validate(idParamValidator,postInputValidator), updatePostHandler)

postsRouter.delete('/:id',basicAuthGuard,validate(idParamValidator), deletePostHandler)

postsRouter.post('/:id/comments',jwtAuthGuard, validate(idParamValidator,commentInputValidator), createPostCommentHandler)