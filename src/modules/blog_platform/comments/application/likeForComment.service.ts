import {commentRepository} from "../repositories/comment.repository";
import {LikeStatus} from "../../common/Like.type";
import {likeForCommentRepository} from "../repositories/likeForComment.repository";

export const LikeForCommentService = {

    async setLikeStatus( commentId:string, userId:string, likeStatus:LikeStatus) {
        const comment = await commentRepository.getCommentById(commentId)

        if(!comment) {
            return false
        }

        const userLikeStatus = await likeForCommentRepository.getUserLikeStatus(commentId, userId)


        if(!userLikeStatus) {
            await likeForCommentRepository.setLikeStatus(commentId,userId,likeStatus)
            return true
        }

        if(userLikeStatus.likeStatus === likeStatus) return true

        await likeForCommentRepository.updateLikeStatus(commentId,userId,likeStatus)

        return true



    }

}