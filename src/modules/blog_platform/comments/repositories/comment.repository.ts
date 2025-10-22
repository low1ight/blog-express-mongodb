import {commentCollection} from "../../../../db/mongodb";
import {CommentInsertModel} from "../models/comment-insert-model";
import {CommentDocumentModel} from "../models/comment-document-model";
import {ObjectId} from "mongodb";

export const commentRepository = {

    async createComment(dto:CommentInsertModel) {

        const newComment = {
            ...dto,
            userId: new ObjectId(dto.userId),
            postId: new ObjectId(dto.postId),
        }

        const result = await commentCollection.insertOne(newComment as CommentDocumentModel)

        return result.insertedId.toString()

    },

    async deleteComment(id:string) {
        await commentCollection.deleteOne({_id:new ObjectId(id)})

    },



    async getCommentById(id:string):Promise<CommentDocumentModel | null> {
         return await commentCollection.findOne({_id:new ObjectId(id)})

    },

    async commentUpdate(commentId:string, commentContent:string) {
        await commentCollection.updateOne({_id:new ObjectId(commentId)},{$set:{content:commentContent}})
    }


}