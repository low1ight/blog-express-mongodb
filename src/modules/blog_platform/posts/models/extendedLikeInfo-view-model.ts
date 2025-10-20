import {LikeStatus} from "../../common/Like.type";
import {NewestLikesViewModel} from "./newest-likes-view-model";

export type ExtendedLikeInfoViewModel = {
    likesCount: number;
    dislikesCount: number;
    myStatus: LikeStatus
    newestLikes:NewestLikesViewModel[]

}