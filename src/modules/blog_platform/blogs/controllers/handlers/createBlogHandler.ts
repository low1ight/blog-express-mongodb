import {RequestWithBody} from "../../../../../common/types/RequestTypes";
import {BlogInputModel} from "../../models/blog-input-model";
import {Response} from "express";
import {BlogViewModel} from "../../models/blog-view-model";
import {blogService} from "../../application/blog.service";
import {blogsQueryRepository} from "../../repositories/blogs.query.repository";

export const createBlogHandler = async (req:RequestWithBody<BlogInputModel>, res:Response<BlogViewModel>) => {

    const createdBlogId = await blogService.createBlog(req.body)

    const blog = await blogsQueryRepository.getBlogById(createdBlogId) as BlogViewModel

    res.status(201).json(blog)
}