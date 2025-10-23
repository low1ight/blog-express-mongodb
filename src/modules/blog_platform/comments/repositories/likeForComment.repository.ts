import {LikeStatus} from "../../common/Like.type";
import {ObjectId} from "mongodb";
import {LikeForComment} from "../../../../db/models/likeForComment.model";


export const likeForCommentRepository = {


    async setLikeStatus(commentId: string, userId: string, likeStatus: LikeStatus) {

        const dto = {
            userId: new ObjectId(userId),
            commentId: new ObjectId(commentId),
            likeStatus
        }

        await LikeForComment.create(dto)
    },


    async getUserLikeStatus(commentId: string, userId: string) {
        return LikeForComment.findOne({
            userId: userId,
            commentId: commentId
        }).lean()
    },

    async updateLikeStatus(commentId: string, userId: string, likeStatus: LikeStatus) {
        await LikeForComment.updateOne({
                userId: userId,
                commentId: commentId
            },
            {$set: {likeStatus: likeStatus}})

    }


}