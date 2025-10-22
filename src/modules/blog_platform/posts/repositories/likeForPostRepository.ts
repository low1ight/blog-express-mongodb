import {LikeStatus} from "../../common/Like.type";
import {ObjectId} from "mongodb";
import {likeForPostCollection} from "../../../../db/mongodb";
import {LikeForPostDocumentModel} from "../models/likeForPost-document-model";

export const likeForPostRepository = {
    async setLikeStatus(postId: string, userId: string, likeStatus: LikeStatus, userLogin:string) {

        const dto = {
            userId: new ObjectId(userId),
            postId: new ObjectId(postId),
            userLogin:userLogin,
            addedAt: new Date().toISOString(),
            likeStatus
        }

        await likeForPostCollection.insertOne(dto as LikeForPostDocumentModel)
    },


    async getUserLikeStatus(postId: string, userId: string) {
        return await likeForPostCollection.findOne({
            userId: new ObjectId(userId),
            postId: new ObjectId(postId)
        })
    },

    async updateLikeStatus(postId: string, userId: string, likeStatus: LikeStatus) {
        await likeForPostCollection.updateOne({
                userId: new ObjectId(userId),
                postId: new ObjectId(postId)
            },
            {$set: {likeStatus: likeStatus,addedAt: new Date().toISOString(),}})

    }
}