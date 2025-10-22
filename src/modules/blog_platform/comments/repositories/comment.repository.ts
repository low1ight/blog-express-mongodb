import {CommentInsertModel} from "../models/comment-insert-model";
import {CommentDocumentModel} from "../models/comment-document-model";
import {ObjectId} from "mongodb";
import {Comment} from "../../../../db/models/comment.model";

export const commentRepository = {

    async createComment(dto:CommentInsertModel) {

        const newComment = {
            ...dto,
            userId: new ObjectId(dto.userId),
            postId: new ObjectId(dto.postId),
        }

        const result:CommentDocumentModel = await Comment.create(newComment)

        return result._id.toString()

    },

    async deleteComment(id:string) {
        await Comment.deleteOne({_id:id})

    },



    async getCommentById(id:string):Promise<CommentDocumentModel | null> {
        return Comment.findOne({_id: (id)}).lean()

    },

    async commentUpdate(commentId:string, commentContent:string) {
        await Comment.updateOne({_id:commentId},{$set:{content:commentContent}})
    }


}