import {LikeStatus} from "../../common/Like.type";
import {ObjectId} from "mongodb";
import {LikeForPostDocumentModel} from "../models/likeForPost-document-model";
import {LikeForPost} from "../../../../db/models/likeForPost.model";

export const likeForPostRepository = {
    async setLikeStatus(postId: string, userId: string, likeStatus: LikeStatus, userLogin:string) {

        const dto = {
            userId: new ObjectId(userId),
            postId: new ObjectId(postId),
            userLogin:userLogin,
            likeStatus
        }

        await LikeForPost.create(dto as LikeForPostDocumentModel)
    },


    async getUserLikeStatus(postId: string, userId: string) {
        return LikeForPost.findOne({
            userId: userId,
            postId: postId
        }).lean()
    },

    async updateLikeStatus(postId: string, userId: string, likeStatus: LikeStatus) {
        await LikeForPost.updateOne({
                userId: userId,
                postId: postId
            },
            {$set: {likeStatus: likeStatus}})

    }
}