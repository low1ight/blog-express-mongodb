import {LikeStatus} from "../../common/Like.type";
import {likeForCommentCollection} from "../../../../db/mongodb";
import {ObjectId} from "mongodb";
import {LikeForCommentDocumentModel} from "../models/likeForComment-document-model";


export const likeForCommentRepository = {


    async setLikeStatus(commentId: string, userId: string, likeStatus: LikeStatus) {

        const dto = {
            userId: new ObjectId(userId),
            commentId: new ObjectId(commentId),
            likeStatus
        } as LikeForCommentDocumentModel

        await likeForCommentCollection.insertOne(dto)
    },


    async getUserLikeStatus(commentId: string, userId: string) {
        return await likeForCommentCollection.findOne({
            userId: new ObjectId(userId),
            commentId: new ObjectId(commentId)
        })
    },

    async updateLikeStatus(commentId: string, userId: string, likeStatus: LikeStatus) {
        await likeForCommentCollection.updateOne({
                userId: new ObjectId(userId),
                commentId: new ObjectId(commentId)
            },
            {$set: {likeStatus: likeStatus}})

    }


}