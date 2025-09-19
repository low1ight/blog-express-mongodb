import {CommentInputModel} from "../models/comment-input-model";
import {postRepository} from "../../posts/repositories/post.repository";
import {userRepository} from "../../../users_module/users/repository/user.repository";
import {commentRepository} from "../repositories/comment.repository";
import {CustomResponse} from "../../../../utils/customResponse/customResponse";
import {CustomResponseEnum} from "../../../../utils/customResponse/customResponseEnum";


export const commentsService = {

    async createComment({content}:CommentInputModel,postId:string,userId:string) {

        const isPostExist = await postRepository.isPostExist(postId);

        if(!isPostExist) return new CustomResponse(false,CustomResponseEnum.INVALID_URI, `invalid post id`);


        const user = await userRepository.getUserById(userId)

        if(!user) return new CustomResponse(false,CustomResponseEnum.UNAUTHORIZED, `UNAUTHORIZED`);



        const createCommentDto = {
            content,
            userId: userId,
            userLogin: user.login,
            postId: postId,
            createdAt: new Date().toISOString()
        }


        const commentId:string = await commentRepository.createComment(createCommentDto)

        return new CustomResponse(true,null,commentId)




    },


    async deleteComment(id:string,userId:string) {

        const comment = await commentRepository.getCommentById(id)

        if(!comment) return new CustomResponse(false,CustomResponseEnum.INVALID_URI, `comment id: ${id} not found`);

        if(comment.userId.toString() !== userId) return new CustomResponse(false, CustomResponseEnum.NO_ACCESS,'Cant delete the comment that is not user own')

        await commentRepository.deleteComment(id)

        return new CustomResponse(true,null,'successful deleted')


    },

    async updateComment(commentId:string, commentUpdateData:CommentInputModel, userId:string) {

        const comment = await commentRepository.getCommentById(commentId)

        if(!comment) return new CustomResponse(false,CustomResponseEnum.INVALID_URI, `comment id: ${commentId} not found`);

        if(comment.userId.toString() !== userId) return new CustomResponse(false, CustomResponseEnum.NO_ACCESS,'Cant delete the comment that is not user own')

        await commentRepository.commentUpdate(commentId, commentUpdateData.content)

        return new CustomResponse(true,null,'successful updated')

    }

}