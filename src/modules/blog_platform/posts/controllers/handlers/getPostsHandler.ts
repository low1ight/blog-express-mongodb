import {Request, Response} from "express";
import {PostViewModel} from "../../models/post-view-model";
import {postQueryRepository} from "../../repositories/post.query.repository";

export const getPostsHandler = async (req:Request, res:Response<PostViewModel[]>) => {
    const posts: PostViewModel[] = await postQueryRepository.getPosts()
    res.send(posts)
}