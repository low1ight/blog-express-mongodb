import {CommentDocumentModel} from "../models/comment-document-model";
import {CommentViewModel} from "../models/comment-view-model";

export const toCommentViewModel = ({ _id,
                                    content,userId,userLogin,createdAt }:CommentDocumentModel):CommentViewModel => {

    return {
        id:_id.toString(),
        content,
        commentatorInfo:{
            userId,
            userLogin
        },
        createdAt
    }
}