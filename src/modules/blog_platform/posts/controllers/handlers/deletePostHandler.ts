import {Id, RequestWithParam} from "../../../../../common/types/RequestTypes";
import {Response} from "express";
import {CustomResponse} from "../../../../../utils/customResponse/customResponse";
import {postService} from "../../application/post.service";
import {toHttpCode} from "../../../../../utils/customResponse/toHttpCode";

export const deletePostHandler = async (req:RequestWithParam<Id>, res:Response) => {

    const response:CustomResponse<null> = await postService.deletePost(req.params.id)

    if(!response.isSuccessful) {
        res.sendStatus(toHttpCode(response.errStatusCode))
        return
    }

    res.sendStatus(204)

}