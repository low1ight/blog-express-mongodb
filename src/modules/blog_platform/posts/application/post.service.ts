import {PostInputModel} from "../models/post-input-model";
import {BlogViewModel} from "../../blogs/models/blog-view-model";
import {blogsQueryRepository} from "../../blogs/repositories/blogs.query.repository";
import {postRepository} from "../repositories/post.repository";
import {ObjectId} from "mongodb";
import {PostInsertModel} from "../models/post-insert-model";


export const postService = {

    async createPost(postInputData:PostInputModel):Promise<string | null> {

        if(!ObjectId.isValid(postInputData.blogId)) {
            return null
        }

        const blog:BlogViewModel | null =  await blogsQueryRepository.getBlogById(postInputData.blogId)

        if(!blog){
            return null
        }

        const postInsertDto:PostInsertModel = {
            ...postInputData,
            blogName: blog.name
        }

        return  await postRepository.createPost(postInsertDto)


    },


    async updatePost(postInputData:PostInputModel,postId:string):Promise<boolean> {

        if(!ObjectId.isValid(postId)) return false

        const isPostExist:boolean = await postRepository.isPostExist(postId)

        if(!isPostExist) return false

        if(!ObjectId.isValid(postInputData.blogId)) {
            return false
        }

        const blog:BlogViewModel | null =  await blogsQueryRepository.getBlogById(postInputData.blogId)

        if(!blog){
            return false
        }

        //create update post dto
        const postInsertDto:PostInsertModel = {
            ...postInputData,
            blogName: blog.name
        }

        return await postRepository.updatePost(postInsertDto,postId)


    },


    async deletePost(postId:string):Promise<boolean> {
        const isPostExist:boolean = await postRepository.isPostExist(postId)

        if(!isPostExist){

            return false
        }

        return await postRepository.deletePost(postId)
    }






}