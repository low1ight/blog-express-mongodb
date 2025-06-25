import {Response} from "express";
import {PostViewModel} from "../../models/post-view-model";
import {postQueryRepository} from "../../repositories/post.query.repository";
import {RequestWithQuery} from "../../../../../common/types/RequestTypes";
import {BaseQuery, BaseQueryMapper} from "../../../../../utils/queryMapper/baseQueryMapper";
import {Paginator} from "../../../../../utils/paginator/paginator";

export const getPostsHandler = async (req:RequestWithQuery<BaseQuery>, res:Response<Paginator<PostViewModel>>) => {

    const query = new BaseQueryMapper(req.query);

    const posts: Paginator<PostViewModel> = await postQueryRepository.getPosts(query)
    res.send(posts)
}