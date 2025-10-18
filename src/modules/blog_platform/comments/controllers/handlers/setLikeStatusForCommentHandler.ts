import {Response} from "express";
import {likeForCommentService} from "../../application/likeForComment.service";
import {Id, RequestWithParamAndBody} from "../../../../../common/types/RequestTypes";
import {LikeForCommentInputModel} from "../../models/likeForComment-input-model";


export const setLikeStatusForCommentHandler = async (req: RequestWithParamAndBody<Id, LikeForCommentInputModel>, res: Response) => {

    const isSuccessful: boolean = await likeForCommentService.setLikeStatus(req.params.id, req.user.userId, req.body.likeStatus);

    if (!isSuccessful) {
        res.sendStatus(404)
        return
    }

    res.sendStatus(204)

}