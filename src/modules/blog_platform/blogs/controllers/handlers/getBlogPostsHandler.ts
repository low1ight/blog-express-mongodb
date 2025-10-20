import {Id, RequestWithParamAndQuery} from "../../../../../common/types/RequestTypes";
import {BaseQuery, BaseQueryMapper} from "../../../../../utils/queryMapper/baseQueryMapper";
import {Response} from "express";
import {Paginator} from "../../../../../utils/paginator/paginator";
import {PostViewModel} from "../../../posts/models/post-view-model";
import {postQueryRepository} from "../../../posts/repositories/post.query.repository";

export const getBlogPostsHandler = async (req:RequestWithParamAndQuery<Id,BaseQuery>, res:Response<Paginator<PostViewModel>>) => {

    const query = new BaseQueryMapper(req.query);

    const posts: Paginator<PostViewModel> = await postQueryRepository.getPosts(query,req.user?.userId,req.params.id);
    res.send(posts)
}