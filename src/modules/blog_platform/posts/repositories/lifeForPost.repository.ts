import {LikeStatus} from "../../common/Like.type";
import {ObjectId} from "mongodb";
import {likeForPostCollection} from "../../../../db/db.mongodb";
import {LikeForPostDocumentModel} from "../models/likeForPost-document-model";

export const lifeForPostRepository = {
    async setLikeStatus(postId: string, userId: string, likeStatus: LikeStatus, userLogin:string) {

        const dto = {
            userId: new ObjectId(userId),
            postId: new ObjectId(postId),
            userLogin:userLogin,
            addedAt: new Date().toISOString(),
            likeStatus
        } as LikeForPostDocumentModel

        await likeForPostCollection.insertOne(dto)
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