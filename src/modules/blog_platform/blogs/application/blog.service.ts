import {BlogInputModel} from "../models/blog-input-model";
import {BlogInsertModel} from "../models/blog-insert-model";
import {blogsRepository} from "../repositories/blogs.repository";
import {postRepository} from "../../posts/repositories/post.repository";
import {CustomResponse} from "../../../../utils/customResponse/customResponse";
import {CustomResponseEnum} from "../../../../utils/customResponse/customResponseEnum";


export const blogService = {
    async createBlog(dto:BlogInputModel):Promise<string> {
        const insertData: BlogInsertModel = {
            ...dto,
            createdAt: new Date().toISOString(),
            isMembership: false
        };

        return await blogsRepository.createBlog(insertData)
    },

    async updateBlog(dto:BlogInputModel,blogId:string) {

        const isBlogExists = await blogsRepository.isBlogExists(blogId)

        if(!isBlogExists) {
            return new CustomResponse(false,CustomResponseEnum.INVALID_URI,null)
        }

        await blogsRepository.updateBlog(blogId,dto)

        return new CustomResponse(true,null,null)

        //fix
        //await postRepository.updatePostsBlogName(req.params.id, req.body.name)
    },

    async deleteBlog(blogId:string) {
        const isBlogExists = await blogsRepository.isBlogExists(blogId)

        if(!isBlogExists) {
            return new CustomResponse(false,CustomResponseEnum.INVALID_URI,null)
        }

         await blogsRepository.deleteBlog(blogId)

        return new CustomResponse(true,null,null)

    }
}