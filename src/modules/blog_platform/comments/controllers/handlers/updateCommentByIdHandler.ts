import {Request, Response} from "express";
import {commentsService} from "../../application/comments.service";
import {CustomResponse} from "../../../../../utils/customResponse/customResponse";
import {toHttpCode} from "../../../../../utils/customResponse/toHttpCode";


export const updateCommentByIdHandler = async (req: Request, res: Response) => {

    const response:CustomResponse<string> = await commentsService.updateComment(req.params.id, req.body, req.user.id);


    if(!response.isSuccessful){
        res.sendStatus(toHttpCode(response.errStatusCode))
        return
    }

     res.sendStatus(204)


}