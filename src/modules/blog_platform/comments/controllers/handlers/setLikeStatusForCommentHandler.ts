import {Response} from "express";
import {LikeForCommentService} from "../../application/likeForComment.service";
import {Id, RequestWithParamAndBody} from "../../../../../common/types/RequestTypes";
import {CommentInputModel} from "../../models/likeForComment-input-model";


export const setLikeStatusForCommentHandler = async (req: RequestWithParamAndBody<Id, CommentInputModel>, res: Response) => {

    const isSuccessful: boolean = await LikeForCommentService.setLikeStatus(req.params.id, req.user.userId, req.body.likeStatus);

    if (!isSuccessful) {
        res.sendStatus(404)
        return
    }

    res.sendStatus(204)

}