import {LikeStatus} from "../../common/Like.type";

export type ExtendedLikeInfoDocumentModel = {
    likeCount: number;
    dislikeCount: number;
    myStatus: LikeStatus
}