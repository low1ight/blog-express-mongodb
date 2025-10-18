import {Id, RequestWithParamAndBody} from "../../../../../common/types/RequestTypes";
import {Response} from "express";
import {LikeForPostInputModel} from "../../models/likeForPost-input-model";
import {likeForPostService} from "../../application/likeForPost.service";


export const setLikeStatusForPostHandler = async (req: RequestWithParamAndBody<Id, LikeForPostInputModel>, res: Response) => {

    const isSuccessful: boolean = await likeForPostService.setLikeStatus(req.params.id, req.user.userId, req.body.likeStatus);

    if (!isSuccessful) {
        res.sendStatus(404)
        return
    }

    res.sendStatus(204)

}