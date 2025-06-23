import {Id, RequestWithParam} from "../../../../../common/types/RequestTypes";
import {Response} from "express";
import {PostViewModel} from "../../models/post-view-model";
import {postQueryRepository} from "../../repositories/post.query.repository";

export const getPostByIdHandler = async (req:RequestWithParam<Id>, res:Response<PostViewModel>) => {
    const post:PostViewModel | null =  await postQueryRepository.getPostById(req.params.id)

    if(!post){
        res.sendStatus(404)
        return
    }

    res.status(200).json(post)
}