import {Id, RequestWithParamAndBody} from "../../../../../common/types/RequestTypes";
import {PostInputModel} from "../../models/post-input-model";
import {Response} from "express";
import {CustomResponse} from "../../../../../utils/customResponse/customResponse";
import {postService} from "../../application/post.service";
import {toHttpCode} from "../../../../../utils/customResponse/toHttpCode";

export const updatePostHandler = async (req:RequestWithParamAndBody<Id,PostInputModel>, res:Response) => {


    const response:CustomResponse<string> = await postService.updatePost(req.body,req.params.id)

    if(!response.isSuccessful) {
        res.sendStatus(toHttpCode(response.errStatusCode))
        return
    }

    res.sendStatus(204)

}