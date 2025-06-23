import {Request, Response} from "express";
import {BlogViewModel} from "../../models/blog-view-model";
import {blogsQueryRepository} from "../../repositories/blogs.query.repository";

export const getBlogsHandler = async (req:Request, res:Response<BlogViewModel[]>) => {
    const blogs:BlogViewModel[] = await blogsQueryRepository.getBlogs()

    res
        .status(200)
        .json(blogs)
}