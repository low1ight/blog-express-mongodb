import {Id, RequestWithParamAndBody} from "../../../../../common/types/RequestTypes";
import {Response} from "express";
import {CustomResponse} from "../../../../../utils/customResponse/customResponse";
import {toHttpCode} from "../../../../../utils/customResponse/toHttpCode";
import {CommentInputModel} from "../../../comments/models/comment-input-model";
import {commentsService} from "../../../comments/application/comments.service";
import {commentQueryRepository} from "../../../comments/repositories/commentQuery.repository";
import {CommentViewModel} from "../../../comments/models/comment-view-model";

export const createPostCommentHandler = async (req:RequestWithParamAndBody<Id,CommentInputModel>, res:Response<CommentViewModel>) => {




    const response:CustomResponse<string> = await commentsService.createComment(req.body,req.params.id,req.user.userId)

    if(!response.isSuccessful){
        res.sendStatus(toHttpCode(response.errStatusCode))
        return
    }

    const comment:CommentViewModel | null = await commentQueryRepository.getCommentById(response.content!)




    res.status(201).send(comment!)


}