import {Id, RequestWithParam} from "../../../../../common/types/RequestTypes";
import {Response} from "express";
import {BlogViewModel} from "../../models/blog-view-model";
import {blogsQueryRepository} from "../../repositories/blogs.query.repository";

export const getBlogByIdHandler =  async (req:RequestWithParam<Id>, res:Response<BlogViewModel>) => {
    console.log('in')
    const blog:BlogViewModel | null = await blogsQueryRepository.getBlogById(req.params.id)
    if(!blog) {
        res.status(404)
        return
    }
    res
        .status(200)
        .json(blog)
}