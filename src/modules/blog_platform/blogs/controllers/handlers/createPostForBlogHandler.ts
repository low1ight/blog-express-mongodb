import {Id, RequestWithParamAndBody} from "../../../../../common/types/RequestTypes";
import {Response} from "express";
import {PostViewModel} from "../../../posts/models/post-view-model";
import {CustomResponse} from "../../../../../utils/customResponse/customResponse";
import {postService} from "../../../posts/application/post.service";
import {toHttpCode} from "../../../../../utils/customResponse/toHttpCode";
import {postQueryRepository} from "../../../posts/repositories/post.query.repository";
import {PostForBlogInputModel} from "../../../posts/models/post-for-blog-input-model";


export const createPostForBlogHandler = async (req:RequestWithParamAndBody<Id,PostForBlogInputModel>, res:Response<PostViewModel>) => {

    const response:CustomResponse<string> = await postService.createPost({blogId:req.params.id,...req.body});

    if(!response.isSuccessful){
        res.sendStatus(toHttpCode(response.errStatusCode))
        return
    }

    const post:PostViewModel | null = await postQueryRepository.getPostById(response.content!) as PostViewModel


    res.status(201).send(post)


}