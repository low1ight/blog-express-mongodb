import {PostDocumentModel} from "../models/post-document-model";
import {PostCreateModel} from "../models/post-create-model";
import {PostUpdateModel} from "../models/post-update-model";
import {Post} from "../../../../db/models/post.model";

export const postRepository = {

    async createPost(dto:PostCreateModel):Promise<string> {

        const result:PostDocumentModel = await Post.create(dto);

        return result._id.toString()
    },


   async updatePost(dto:PostUpdateModel,postId:string) {

        const result = await Post.updateOne({_id: postId},{$set: dto})

       return result.matchedCount === 1
    },


    async deletePost(postId:string) : Promise<boolean> {
        const result =  await Post.deleteOne({_id: postId})

        return result.deletedCount === 1

    },

    async isPostExist(postId:string):Promise<boolean> {
        const result = Post.exists({_id:postId})
        return !!result

    },


    async updatePostsBlogName(id:string,blogName:string) {
        const result = await Post.updateMany({blogId:id},{$set:{blogName:blogName}})

        return result.matchedCount === 1
    },

    async deleteAllBlogPosts(blogId:string) {
        await Post.deleteMany({blogId: blogId})
    }


}