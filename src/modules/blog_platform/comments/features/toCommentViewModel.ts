import {CommentDocumentModel} from "../models/comment-document-model";
import {CommentViewModel} from "../models/comment-view-model";
import {LikesInfoModel} from "../models/likes-info-model";

export const toCommentViewModel = ({
                                       _id,
                                       content, userId, userLogin, createdAt
                                   }: CommentDocumentModel,{likesCount,dislikesCount,myStatus}:LikesInfoModel): CommentViewModel => {

    return {
        id: _id.toString(),
        content,
        commentatorInfo: {
            userId: userId.toString(),
            userLogin
        },
        likesInfo: {
            likesCount,
            dislikesCount,
            myStatus:myStatus || "None"
        },
        createdAt
    }
}