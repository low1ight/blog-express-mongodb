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
import {Id, RequestWithBody, RequestWithParam, RequestWithParamAndBody} from "../../../../common/types/RequestTypes";
import {PostInputModel} from "../models/post-input-model";


export const postsRouter = Router()



postsRouter.get('/',async (req:Request, res:Response<PostViewModel[]>) => {
    const posts: PostViewModel[] = await postQueryRepository.getPosts()
     res.send(posts)
})



postsRouter.get('/:id',validate(idParamValidator),async (req:RequestWithParam<Id>, res:Response<PostViewModel>) => {
    const post:PostViewModel | null =  await postQueryRepository.getPostById(req.params.id)

    if(!post){
        res.sendStatus(404)
        return
    }

     res.status(200).json(post)
})


postsRouter.post('/',basicAuthGuard,validate(postInputValidator), async (req:RequestWithBody<PostInputModel>, res:Response<PostViewModel>) => {

    const response:CustomResponse<string> = await postService.createPost(req.body)

    if(!response.isSuccessful){
        res.sendStatus(toHttpCode(response.errStatusCode))
        return
    }

    const post:PostViewModel | null = await postQueryRepository.getPostById(response.content!) as PostViewModel


    res.status(201).send(post)


})


postsRouter.put('/:id',basicAuthGuard,validate(idParamValidator,postInputValidator), async (req:RequestWithParamAndBody<Id,PostInputModel>, res:Response) => {


    const response:CustomResponse<string> = await postService.updatePost(req.body,req.params.id)

    if(!response.isSuccessful) {
        res.sendStatus(toHttpCode(response.errStatusCode))
        return
    }

    res.sendStatus(204)

})


postsRouter.delete('/:id',basicAuthGuard,validate(idParamValidator), async (req:RequestWithParam<Id>, res:Response) => {

    const response:CustomResponse<null> = await postService.deletePost(req.params.id)

    if(!response.isSuccessful) {
        res.sendStatus(toHttpCode(response.errStatusCode))
        return
    }

    res.sendStatus(204)

})