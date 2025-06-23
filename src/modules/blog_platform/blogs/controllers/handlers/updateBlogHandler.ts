import {Id, RequestWithParamAndBody} from "../../../../../common/types/RequestTypes";
import {BlogInputModel} from "../../models/blog-input-model";
import {Response} from "express";
import {CustomResponse} from "../../../../../utils/customResponse/customResponse";
import {blogService} from "../../application/blog.service";
import {toHttpCode} from "../../../../../utils/customResponse/toHttpCode";

export const updateBlogHandler = async (req:RequestWithParamAndBody<Id, BlogInputModel>, res:Response) => {

    const result:CustomResponse<null> = await blogService.updateBlog(req.body,req.params.id)

    if(!result.isSuccessful) {
        res.sendStatus(toHttpCode(result.errStatusCode))
        return
    }

    res.sendStatus(204)
    return
}