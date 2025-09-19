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




    }

}