import {ObjectId} from "mongodb";
import {LikeStatus} from "../../common/Like.type";

export type LikeForPostDocumentModel = {
    _id: ObjectId,
    userId: ObjectId,
    commentId: ObjectId,
    likeStatus: LikeStatus
}



