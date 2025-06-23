import {Id, RequestWithParam} from "../../../../../common/types/RequestTypes";
import {Response} from "express";
import {CustomResponse} from "../../../../../utils/customResponse/customResponse";
import {blogService} from "../../application/blog.service";
import {toHttpCode} from "../../../../../utils/customResponse/toHttpCode";

export const deleteBlogHandler = async (req:RequestWithParam<Id>, res:Response) => {

    const result:CustomResponse<null> = await blogService.deleteBlog(req.params.id)

    if(!result.isSuccessful) {
        res.sendStatus(toHttpCode(result.errStatusCode))
        return
    }

    res.sendStatus(204)
}