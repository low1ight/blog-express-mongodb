import {LikeStatus} from "../../common/Like.type";
import {NewestLikesViewModel} from "./newest-likes-view-model";

export type ExtendedLikeInfoViewModel = {
    likeCount: number;
    dislikeCount: number;
    myStatus: LikeStatus
    newestLikes:NewestLikesViewModel[]

}