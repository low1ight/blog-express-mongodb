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
import {jwtAccessTokenAuthGuard} from "../../../users_module/auth/guards/jwtAccessToken.auth.guard";
import {getPostCommentsHandler} from "./handlers/getPostsCommentsHandler";
import {optionalJwtAccessTokenAuthGuard} from "../../../users_module/auth/guards/optionalJwtAccessToken.auth.guard";
import {setLikeStatusForPostHandler} from "./handlers/setLikeStatusFoPostHandler";
import {likeForPostInputValidator} from "../vlidators/likeForPost-input-validator";



export const postsRouter = Router()


postsRouter.get('/',optionalJwtAccessTokenAuthGuard, getPostsHandler)

postsRouter.get('/:id',optionalJwtAccessTokenAuthGuard,validate(idParamValidator), getPostByIdHandler)

postsRouter.post('/',basicAuthGuard,validate(postInputValidator), createPostHandler)

postsRouter.post('/:id/like-status',jwtAccessTokenAuthGuard,validate(idParamValidator, likeForPostInputValidator), setLikeStatusForPostHandler)

postsRouter.put('/:id',basicAuthGuard,validate(idParamValidator,postInputValidator), updatePostHandler)

postsRouter.delete('/:id',basicAuthGuard,validate(idParamValidator), deletePostHandler)

postsRouter.get('/:id/comments',optionalJwtAccessTokenAuthGuard,validate(idParamValidator), getPostCommentsHandler)

postsRouter.post('/:id/comments',jwtAccessTokenAuthGuard, validate(idParamValidator,commentInputValidator), createPostCommentHandler)

