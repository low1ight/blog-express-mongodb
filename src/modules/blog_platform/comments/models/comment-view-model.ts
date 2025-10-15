import {LikeStatus} from "../../common/Like.type";

export type CommentViewModel = {
    id: string
    content:string
    commentatorInfo:{
        userId: string
        userLogin: string
    }
    likesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: LikeStatus
    }
    createdAt:string


}
