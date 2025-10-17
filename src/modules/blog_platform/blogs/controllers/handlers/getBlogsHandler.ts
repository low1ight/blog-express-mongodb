import {Response} from "express";
import {BlogViewModel} from "../../models/blog-view-model";
import {blogsQueryRepository} from "../../repositories/blogs.query.repository";
import {RequestWithQuery} from "../../../../../common/types/RequestTypes";
import {BlogQuery, BlogQueryMapper} from "../../features/blogQueryMapper";
import {Paginator} from "../../../../../utils/paginator/paginator";

export const getBlogsHandler = async (req:RequestWithQuery<BlogQuery>, res:Response<Paginator<BlogViewModel>>) => {

    const mappedQuery = new BlogQueryMapper(req.query);
    console.log('work?')

    const blogs:Paginator<BlogViewModel> = await blogsQueryRepository.getBlogs(mappedQuery)

    res
        .status(200)
        .json(blogs)
}