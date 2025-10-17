import {Response} from "express";
import {Id, RequestWithParamAndQuery} from "../../../../../common/types/RequestTypes";
import {BaseQuery, BaseQueryMapper} from "../../../../../utils/queryMapper/baseQueryMapper";
import {Paginator} from "../../../../../utils/paginator/paginator";
import {commentQueryRepository} from "../../../comments/repositories/commentQuery.repository";
import {CommentViewModel} from "../../../comments/models/comment-view-model";

export const getPostCommentsHandler = async (req:RequestWithParamAndQuery<Id,BaseQuery>, res:Response<Paginator<CommentViewModel>>) => {

    const query = new BaseQueryMapper(req.query);

    const comments: Paginator<CommentViewModel> = await commentQueryRepository.getPostComments(query,req.params.id,req?.user?.userId || null)

    res.send(comments)
}