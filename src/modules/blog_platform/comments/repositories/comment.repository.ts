import {commentCollection} from "../../../../db/db.mongodb";
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

    }


}