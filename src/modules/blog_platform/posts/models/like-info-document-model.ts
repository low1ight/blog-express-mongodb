import {LikeStatus} from "../../common/Like.type";
import {ObjectId} from "mongodb";

export type LikeInfoDocumentModel = {
    _id: ObjectId
    likesCount: number;
    dislikesCount: number;
    myStatus: LikeStatus
}