import {LikeStatus} from "../../common/Like.type";
import {NewestLikeViewModel} from "./newestLike-view-model";

export type ExtendedLikeInfoViewModel = {
    likeCount: number;
    dislikeCount: number;
    myStatus: LikeStatus
    newestLikes:NewestLikeViewModel[]

}