import {postCollection} from "../../../../db/db.mongodb";
import {PostDocumentModel} from "../models/post-document-model";
import {ObjectId} from "mongodb";
import {PostCreateModel} from "../models/post-create-model";
import {PostUpdateModel} from "../models/post-update-model";

export const postRepository = {

    async createPost(dto:PostCreateModel):Promise<string> {

        const result = await postCollection.insertOne(dto as PostDocumentModel);

        return result.insertedId.toString()
    },


   async updatePost(dto:PostUpdateModel,postId:string) {

        const result = await postCollection.updateOne({_id: new ObjectId(postId)},{$set: dto})

       return result.matchedCount === 1
    },


    async deletePost(postId:string) : Promise<boolean> {
        const result =  await postCollection.deleteOne({_id: new ObjectId(postId)})

        return result.deletedCount === 1

    },

    async isPostExist(postId:string):Promise<boolean> {
        const post: PostDocumentModel | null = await postCollection.findOne({_id:new ObjectId(postId)})

        return !!post
    },


    async updatePostsBlogName(id:string,blogName:string) {
        const result = await postCollection.updateMany({blogId:new ObjectId(id)},{$set:{blogName:blogName}})

        return result.matchedCount === 1
    }


}