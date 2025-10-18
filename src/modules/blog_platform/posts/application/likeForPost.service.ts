import {postRepository} from "../repositories/post.repository";
import {lifeForPostRepository} from "../repositories/lifeForPost.repository";
import {LikeStatus} from "../../common/Like.type";
import {userRepository} from "../../../users_module/users/repository/user.repository";

export const likeForPostService = {

   async setLikeStatus(postId:string,userId:string, likeStatus:LikeStatus) {
       const post = await postRepository.isPostExist(postId)

       if(!post) {
           return false
       }

       const user = await userRepository.getUserById(userId)

       if(!user) {
           return false
       }

       const userLikeStatus = await lifeForPostRepository.getUserLikeStatus(postId, userId)


       if(!userLikeStatus) {
           await lifeForPostRepository.setLikeStatus(postId,userId,likeStatus,user.login)
           return true
       }

       if(userLikeStatus.likeStatus === likeStatus) return true

       await lifeForPostRepository.updateLikeStatus(postId,userId,likeStatus)

       return true
    }

}