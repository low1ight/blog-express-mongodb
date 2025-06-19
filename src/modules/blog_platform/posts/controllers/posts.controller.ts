import {Router,Response,Request} from "express";
import {postQueryRepository} from "../repositories/post.query.repository";
import {PostViewModel} from "../models/post-view-model";
import {validate} from "../../../../common/validator/validationHandler";
import {postInputValidator} from "../vlidators/post-input-validator";
import {basicAuthGuard} from "../../../users_module/auth/guards/basic.auth.guard";
import {postService} from "../application/post.service";
import {idParamValidator} from "../../../../common/validator/mongodb-id-validator";
import {CustomResponse} from "../../../../utils/customResponse/customResponse";
import {toHttpCode} from "../../../../utils/customResponse/toHttpCode";


export const postsRouter = Router()



postsRouter.get('/',async (req:Request, res:Response) => {
    const posts: PostViewModel[] = await postQueryRepository.getPosts()
     res.send(posts)
})



postsRouter.get('/:id',validate(idParamValidator),async (req:Request, res:Response) => {
    const post:PostViewModel | null =  await postQueryRepository.getPostById(req.params.id)

    if(!post){
        res.sendStatus(404)
        return
    }

     res.status(200).json(post)
})


postsRouter.post('/',basicAuthGuard,validate(postInputValidator), async (req:Request, res:Response) => {

    const response:CustomResponse<string> = await postService.createPost(req.body)

    if(!response.isSuccessful){
        res.sendStatus(toHttpCode(response.errStatusCode))
        return
    }

    const post:PostViewModel | null = await postQueryRepository.getPostById(response.content!)


    res.status(201).send(post)


})


postsRouter.put('/:id',basicAuthGuard,validate(idParamValidator,postInputValidator), async (req:Request, res:Response) => {


    const response:CustomResponse<string> = await postService.updatePost(req.body,req.params.id)

    if(!response.isSuccessful) {
        res.sendStatus(toHttpCode(response.errStatusCode))
        return
    }

    res.sendStatus(204)

})


postsRouter.delete('/:id',basicAuthGuard,validate(idParamValidator), async (req:Request, res:Response) => {

    const response:CustomResponse<null> = await postService.deletePost(req.params.id)

    if(!response.isSuccessful) {
        res.sendStatus(toHttpCode(response.errStatusCode))
        return
    }

    res.sendStatus(204)

})