import {CommentInputModel} from "../../blog_platform/comments/models/comment-input-model";

export const createCommentsForPostInsertData = (commentCount:number):CommentInputModel[] => {
    const commentInsertDataArr:CommentInputModel[] = []

    for(let i = 0; i < commentCount; i++) {

        const commentInsertModel:CommentInputModel = {
            content: 'Created testing NEW comment data ' + i,
        }
        commentInsertDataArr.push(commentInsertModel)
    }

    return commentInsertDataArr
}