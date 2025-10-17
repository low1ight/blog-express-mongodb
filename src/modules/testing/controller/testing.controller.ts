import {Router, Request, Response} from "express";
import {testingRepository} from "../repositories/testing.repository";
import {blogService} from "../../blog_platform/blogs/application/blog.service";
import {createBlogInsertData} from "../common/create-blog-insert-data";
import {createPostForBlogInsertData} from "../common/create-post-for-blog-insert-data";
import {postService} from "../../blog_platform/posts/application/post.service";
import {createUsersInsertData} from "../common/create-users-insert-data";
import {userService} from "../../users_module/users/application/user.service";
import {authService} from "../../users_module/auth/application/auth.service";
import {createCommentsForPostInsertData} from "../common/create-comments-for-post-insert-data";
import {commentsService} from "../../blog_platform/comments/application/comments.service";
import {likeForCommentRepository} from "../../blog_platform/comments/repositories/likeForComment.repository";
import {LikeStatus} from "../../blog_platform/common/Like.type";


export const testingRouter = Router()


testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    await testingRepository.deleteAllData()
    res.sendStatus(204)
})


testingRouter.post('/add-data', async (req: Request, res: Response) => {
    const blogsCount = 30
    const postsCount = 20
    const commentCount = 20
    const likeCount = 10
    const dislikeCount = 5


    //create test blogs
    const blogForCreation = Array.from(createBlogInsertData(blogsCount), async (blog) => {
        return await blogService.createBlog(blog)
    })

    const blogsIds: string[] = await Promise.all(blogForCreation)

    //create posts

    const postForCreation = Array.from(createPostForBlogInsertData(postsCount), async (post) => {
        return await postService.createPost({...post, blogId: blogsIds[0]})
    })

    const postResponses = await Promise.all(postForCreation)

    const postIds: string[] = postResponses.map(post => post.content as string)

    //create user


    const userInputData = createUsersInsertData(1)

    const user = await userService.createUser(userInputData[0])

    const usersId = user.content as string

    //createUsersFor LIKE/DISLIKE

    const likeUserInputData = createUsersInsertData(likeCount)
    const dislikeUserInputData = createUsersInsertData(dislikeCount)

    const likeUsersForCreations = Array.from(likeUserInputData, async (user) => {
        return await userService.createUser(user)
    })

    const disUsersForCreations = Array.from(dislikeUserInputData, async (user) => {
        return await userService.createUser(user)
    })

    const likeUserRes = await Promise.all(likeUsersForCreations)
    const dislikeUserRes = await Promise.all(disUsersForCreations)

    const usersIdsForLike = likeUserRes.map(r => r.content) as string[]
    const usersIdsForDislike = dislikeUserRes.map(r => r.content) as string[]



   //create comments

    console.log('before comments')


    const commentsForCreation = Array.from(createCommentsForPostInsertData(commentCount), async (comment) => {
        return await commentsService.createComment(comment, postIds[0], usersId)
    })

    console.log('comment for post id::',postIds[0])

    const commentResponse = await Promise.all(commentsForCreation)


    const commentIds: string[] = commentResponse.map(comment => comment.content as string)


    //set likes for comments
    const likesForCommentsForCreation = Array.from(usersIdsForLike, async (userId) => {
        return await likeForCommentRepository.setLikeStatus(commentIds[0],userId, "Like" as LikeStatus)
    })

    const dislikesForCommentsForCreation = Array.from(usersIdsForDislike, async (userId) => {
        return await likeForCommentRepository.setLikeStatus(commentIds[0],userId, "Dislike" as LikeStatus)
    })

     await Promise.all(likesForCommentsForCreation)
     await Promise.all(dislikesForCommentsForCreation)

    console.log('liked comment id:',commentIds[0])


    res.sendStatus(200)




})


