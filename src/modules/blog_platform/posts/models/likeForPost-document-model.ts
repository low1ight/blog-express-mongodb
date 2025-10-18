import {ObjectId} from "mongodb";
import {LikeStatus} from "../../common/Like.type";

export type LikeForPostDocumentModel = {
    _id: ObjectId,
    userId: ObjectId,
    userLogin: string,
    postId: ObjectId,
    likeStatus: LikeStatus
    addedAt: string,

}



