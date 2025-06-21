import {Router} from "express";
import {Request, Response} from "express";
import {blogsQueryRepository} from "../repositories/blogs.query.repository";
import {blogsRepository} from "../repositories/blogs.repository";
import {BlogViewModel} from "../models/blog-view-model";
import {basicAuthGuard} from "../../../users_module/auth/guards/basic.auth.guard";
import {blogInputValidator} from "../validators/create-blog-input-validator";
import {validate} from "../../../../common/validator/validationHandler";
import {postRepository} from "../../posts/repositories/post.repository";
import {idParamValidator} from "../../../../common/validator/mongodb-id-validator";
import {blogService} from "../application/blog.service";
import {CustomResponse} from "../../../../utils/customResponse/customResponse";
import {toHttpCode} from "../../../../utils/customResponse/toHttpCode";



export const blogRouter = Router()


blogRouter.get('/',  async (req:Request, res:Response) => {
    const blogs:BlogViewModel[] = await blogsQueryRepository.getBlogs()

    res
    .status(200)
    .json(blogs)
})

blogRouter.get('/:id',validate(idParamValidator) ,async (req:Request, res:Response) => {
    console.log('in')
    const blog:BlogViewModel | null = await blogsQueryRepository.getBlogById(req.params.id)
    if(!blog) {
        res.status(404).json({error: "Blog not found"})
        return
    }
    res
        .status(200)
        .json(blog)
})

blogRouter.post('/',basicAuthGuard, validate(blogInputValidator),async (req:Request, res:Response) => {

    const createdBlogId = await blogService.createBlog(req.body)
    const blog = await blogsQueryRepository.getBlogById(createdBlogId)
    res.status(201).json(blog)
})



blogRouter.put('/:id',basicAuthGuard,validate(idParamValidator,blogInputValidator), async (req:Request, res:Response) => {

    const result:CustomResponse<null> = await blogService.updateBlog(req.body,req.params.id)

    if(!result.isSuccessful) {
        res.status(toHttpCode(result.errStatusCode))
        return
    }

    res.sendStatus(204)
})



blogRouter.delete('/:id',basicAuthGuard,validate(idParamValidator),async (req:Request, res:Response) => {

    const result:CustomResponse<null> = await blogService.deleteBlog(req.params.id)

    if(!result.isSuccessful) {
        res.status(toHttpCode(result.errStatusCode))
        return
    }

    res.sendStatus(204)
})