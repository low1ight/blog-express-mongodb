import {PostInputModel} from "../models/post-input-model";
import {BlogViewModel} from "../../blogs/models/blog-view-model";
import {blogsQueryRepository} from "../../blogs/repositories/blogs.query.repository";
import {postRepository} from "../repositories/post.repository";
import {ObjectId} from "mongodb";
import {PostInsertModel} from "../models/post-insert-model";
import {CustomResponse} from "../../../../utils/customResponse/customResponse";
import {CustomResponseEnum} from "../../../../utils/customResponse/customResponseEnum";


export const postService = {

    async createPost(postInputData:PostInputModel):Promise<CustomResponse<string>> {

        if(!ObjectId.isValid(postInputData.blogId)) {
            return new CustomResponse(false,CustomResponseEnum.INVALID_INPUT_DATA,"Blog with this id dont exist")
        }

        const blog:BlogViewModel | null =  await blogsQueryRepository.getBlogById(postInputData.blogId)

        if(!blog){
            return new CustomResponse(false,CustomResponseEnum.INVALID_INPUT_DATA,"Blog with this id dont exist")
        }

        const postInsertDto:PostInsertModel = {
            ...postInputData,
            blogName: blog.name
        }

        const createdPostId:string = await postRepository.createPost(postInsertDto)

        return new CustomResponse(true,null,createdPostId)


    },


    async updatePost(postInputData:PostInputModel,postId:string):Promise<CustomResponse<string>> {

        if(!ObjectId.isValid(postId)) return new CustomResponse(false,CustomResponseEnum.INVALID_URI, 'Post id dont exist')

        const isPostExist:boolean = await postRepository.isPostExist(postId)

        if(!isPostExist) return new CustomResponse(false,CustomResponseEnum.INVALID_URI, 'Post id dont exist')

        if(!ObjectId.isValid(postInputData.blogId)) {
             return new CustomResponse(false,CustomResponseEnum.INVALID_INPUT_DATA, 'Incorrect blog id')
        }

        const blog:BlogViewModel | null =  await blogsQueryRepository.getBlogById(postInputData.blogId)

        if(!blog){
            return new CustomResponse(false,CustomResponseEnum.INVALID_INPUT_DATA, 'Incorrect blog id')
        }

        //create update post dto
        const postInsertDto:PostInsertModel = {
            ...postInputData,
            blogName: blog.name
        }

        await postRepository.updatePost(postInsertDto,postId)

        return new CustomResponse(true,null,'ok')


    },


    async deletePost(postId:string):Promise<CustomResponse<null>> {
        const isPostExist:boolean = await postRepository.isPostExist(postId)

        if(!isPostExist){

            return new CustomResponse(false,CustomResponseEnum.INVALID_URI,null)
        }

         await postRepository.deletePost(postId)

        return new CustomResponse(true,null,null)
    }






}