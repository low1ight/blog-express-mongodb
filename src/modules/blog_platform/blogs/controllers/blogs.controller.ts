import {Router} from "express";
import {basicAuthGuard} from "../../../users_module/auth/guards/basic.auth.guard";
import {blogInputValidator} from "../validators/create-blog-input-validator";
import {validate} from "../../../../common/validator/validationHandler";
import {idParamValidator} from "../../../../common/validator/mongodb-id-validator";
import {getBlogsHandler} from "./handlers/getBlogsHandler";
import {getBlogByIdHandler} from "./handlers/getBlogByIdHandler";
import {createBlogHandler} from "./handlers/createBlogHandler";
import {updateBlogHandler} from "./handlers/updateBlogHandler";
import {deleteBlogHandler} from "./handlers/deleteBlogHandler";
import {postForBlogInputValidator} from "../../posts/vlidators/post-input-validator";
import {createPostForBlog} from "./handlers/createPostForBlog";



export const blogRouter = Router()


blogRouter.get('/',  getBlogsHandler)

blogRouter.get('/:id',validate(idParamValidator) ,getBlogByIdHandler)

blogRouter.post('/',basicAuthGuard, validate(blogInputValidator), createBlogHandler)

blogRouter.put('/:id',basicAuthGuard,validate(idParamValidator,blogInputValidator), updateBlogHandler)

blogRouter.delete('/:id',basicAuthGuard,validate(idParamValidator), deleteBlogHandler)

blogRouter.post('/:id/posts',basicAuthGuard, validate(postForBlogInputValidator), createPostForBlog)