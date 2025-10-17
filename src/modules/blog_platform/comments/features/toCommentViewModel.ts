import {CommentDocumentModel} from "../models/comment-document-model";
import {CommentViewModel} from "../models/comment-view-model";
import {LikesInfoModel} from "../models/likes-info-model";

export const toCommentViewModel = ({
                                       _id,
                                       content, userId, userLogin, createdAt
                                   }: CommentDocumentModel,likesInfoModel:LikesInfoModel | undefined): CommentViewModel => {
    console.log('status:',likesInfoModel?.myStatus)

    return {
        id: _id.toString(),
        content,
        commentatorInfo: {
            userId: userId.toString(),
            userLogin
        },
        likesInfo: {
            likesCount:likesInfoModel?.likesCount || 0,
            dislikesCount: likesInfoModel?.dislikesCount || 0,
            myStatus:likesInfoModel?.myStatus || "None"
        },
        createdAt
    }
}