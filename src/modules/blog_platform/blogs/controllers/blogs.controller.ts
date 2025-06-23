import {Router} from "express";
import {Request, Response} from "express";
import {blogsQueryRepository} from "../repositories/blogs.query.repository";
import {BlogViewModel} from "../models/blog-view-model";
import {basicAuthGuard} from "../../../users_module/auth/guards/basic.auth.guard";
import {blogInputValidator} from "../validators/create-blog-input-validator";
import {validate} from "../../../../common/validator/validationHandler";
import {idParamValidator} from "../../../../common/validator/mongodb-id-validator";
import {blogService} from "../application/blog.service";
import {CustomResponse} from "../../../../utils/customResponse/customResponse";
import {toHttpCode} from "../../../../utils/customResponse/toHttpCode";
import {Id, RequestWithBody, RequestWithParam, RequestWithParamAndBody} from "../../../../common/types/RequestTypes";
import {BlogInputModel} from "../models/blog-input-model";



export const blogRouter = Router()


blogRouter.get('/',  async (req:Request, res:Response<BlogViewModel[]>) => {
    const blogs:BlogViewModel[] = await blogsQueryRepository.getBlogs()

    res
    .status(200)
    .json(blogs)
})

blogRouter.get('/:id',validate(idParamValidator) ,async (req:RequestWithParam<Id>, res:Response<BlogViewModel>) => {
    console.log('in')
    const blog:BlogViewModel | null = await blogsQueryRepository.getBlogById(req.params.id)
    if(!blog) {
        res.status(404)
        return
    }
    res
        .status(200)
        .json(blog)
})

blogRouter.post('/',basicAuthGuard, validate(blogInputValidator),async (req:RequestWithBody<BlogInputModel>, res:Response<BlogViewModel>) => {

    const createdBlogId = await blogService.createBlog(req.body)

    const blog = await blogsQueryRepository.getBlogById(createdBlogId) as BlogViewModel

    res.status(201).json(blog)
})



blogRouter.put('/:id',basicAuthGuard,validate(idParamValidator,blogInputValidator), async (req:RequestWithParamAndBody<Id, BlogInputModel>, res:Response) => {

    const result:CustomResponse<null> = await blogService.updateBlog(req.body,req.params.id)

    if(!result.isSuccessful) {
        res.sendStatus(toHttpCode(result.errStatusCode))
        return
    }

    res.sendStatus(204)
    return
})



blogRouter.delete('/:id',basicAuthGuard,validate(idParamValidator),async (req:RequestWithParam<Id>, res:Response) => {

    const result:CustomResponse<null> = await blogService.deleteBlog(req.params.id)

    if(!result.isSuccessful) {
        res.sendStatus(toHttpCode(result.errStatusCode))
        return
    }

    res.sendStatus(204)
})