import {RequestWithBody} from "../../../../../common/types/RequestTypes";
import {PostInputModel} from "../../models/post-input-model";
import {Response} from "express";
import {PostViewModel} from "../../models/post-view-model";
import {CustomResponse} from "../../../../../utils/customResponse/customResponse";
import {postService} from "../../application/post.service";
import {toHttpCode} from "../../../../../utils/customResponse/toHttpCode";
import {postQueryRepository} from "../../repositories/post.query.repository";

export const createPostHandler = async (req:RequestWithBody<PostInputModel>, res:Response<PostViewModel>) => {

    const response:CustomResponse<string> = await postService.createPost(req.body)

    if(!response.isSuccessful){
        res.sendStatus(toHttpCode(response.errStatusCode))
        return
    }

    const post:PostViewModel | null = await postQueryRepository.getPostById(response.content!) as PostViewModel


    res.status(201).send(post)


}