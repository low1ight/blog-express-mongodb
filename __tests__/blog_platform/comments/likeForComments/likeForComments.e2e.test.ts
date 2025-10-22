import {req, reqWithBasicAuth, reqWithBearerAuth} from "../../../common/test-helpers";
import {correctCreateFirstUserData, correctFirstUserLoginData} from "../../../users_module/auth/common/auth-test-data";
import {correctCreateBlogInputData} from "../../blogs/common/blog-test-data";
import {correctPostInputData} from "../../posts/common/post-test-data";
import {commentCorrectCreateInputData} from "../common/comment-test-data";
import {randomUUID} from "node:crypto";
import {userService} from "../../../../src/modules/users_module/users/application/user.service";
import {likeForCommentService} from "../../../../src/modules/blog_platform/comments/application/likeForComment.service";
import {LikeStatus} from "../../../../src/modules/blog_platform/common/Like.type";
import {MongoMemoryServer} from "mongodb-memory-server";
import {runDB} from "../../../../src/db/mongodb";


describe('POST/PUT comments validation tests', () => {

    let mongodb:MongoMemoryServer
    let blogId: string
    let postId: string

    let fistCommentId: string
    let secondCommentId: string
    let thirdCommentId: string

    let fistUsersIdsArr:string[]
    let secondUsersIdsArr:string[]


    let firstJwtAccessToken: string

    const createCorrectCommentData = (likesCount: number, dislikesCount: number, myStatus: string) => {
        return {
            id: expect.any(String),
            content: commentCorrectCreateInputData.content,
            commentatorInfo: {
                userId: expect.any(String),
                userLogin: correctCreateFirstUserData.login
            },
            likesInfo: {
                likesCount,
                dislikesCount,
                myStatus
            },
            createdAt: expect.any(String)
        }
    }

    const addLikeStatusToComment = (userIdsArr:string[],commentId:string,likeStatus:LikeStatus) => {
        return Promise.all(Array.from(userIdsArr, async (userId) => {
            await likeForCommentService.setLikeStatus(commentId,userId,likeStatus)
        }))
    }







    beforeAll(async () => {

        mongodb = await MongoMemoryServer.create();
        const uri = mongodb.getUri();
        await runDB(uri)

        //delete all data
        await reqWithBasicAuth.delete('/testing/all-data')

        //create user
        await reqWithBasicAuth.post('/users')
            .send(correctCreateFirstUserData)

        const fistUsersArrForCreation = Array.from({length:10}, async () => {
              return await userService.createUser({login: randomUUID(), email: randomUUID() + '@gmail.com', password: 'qwerty'})

        })

        const secondUsersArrForCreation = Array.from({length:5},async () => {
            return await userService.createUser({login: randomUUID(), email: randomUUID() + '@gmail.com', password: 'qwerty'})
        })

        const fistUsersArr = await Promise.all(fistUsersArrForCreation)
        const secondUsersArr = await Promise.all(secondUsersArrForCreation)

         fistUsersIdsArr = fistUsersArr.map(i => i.content) as string[]
         secondUsersIdsArr = secondUsersArr.map(i => i.content) as string[]



        //create blog
        const blog = await reqWithBasicAuth.post("/blogs")
            .send(correctCreateBlogInputData)

        blogId = blog.body.id

        //create post

        const post = await reqWithBasicAuth.post(`/blogs/${blogId}/posts`)
            .send(correctPostInputData)

        postId = post.body.id

        //get jwt login token

        const userLogin = await req.post(`/auth/login`)
            .send(correctFirstUserLoginData)

        firstJwtAccessToken = userLogin.body


    })

    afterAll(async () => {
        await mongodb.stop()
    })


    it('should create successful create 3 comment for post', async () => {

        const fistComment = await reqWithBearerAuth(firstJwtAccessToken).post(`/posts/${postId}/comments`)
            .send(commentCorrectCreateInputData)

        expect(fistComment.status).toBe(201)

        fistCommentId = fistComment.body.id


        const secondComment = await reqWithBearerAuth(firstJwtAccessToken).post(`/posts/${postId}/comments`)
            .send(commentCorrectCreateInputData)

        expect(secondComment.status).toBe(201)

        secondCommentId = secondComment.body.id


        const thirdComment = await reqWithBearerAuth(firstJwtAccessToken).post(`/posts/${postId}/comments`)
            .send(commentCorrectCreateInputData)

        expect(thirdComment.status).toBe(201)

       thirdCommentId = thirdComment.body.id


    })


    it('should return 3 comments with 0 like/dislike and "None" user like status ', async () => {

        const result = await req.get(`/posts/${postId}/comments`)

        expect(result.status).toBe(200)

        expect(result.body.items.length).toBe(3)

        expect(result.body.items).toEqual([
                createCorrectCommentData(0, 0, "None"),
                createCorrectCommentData(0, 0, "None"),
                createCorrectCommentData(0, 0, "None"),
            ]
        )


    })



    it('should return 401 for request without bearer token like status', async () => {

        const result = await req.post(`/comments/${fistCommentId}/like-status`)
            .send({likeStatus: "Like"})

        expect(result.status).toBe(401)


    })


    it('should return 400 for empty like status', async () => {

        const result = await reqWithBearerAuth(firstJwtAccessToken).post(`/comments/${fistCommentId}/like-status`)

        expect(result.status).toBe(400)


    })


    it('should return 400 for incorrect like status', async () => {

        const result = await reqWithBearerAuth(firstJwtAccessToken)
            .post(`/comments/${fistCommentId}/like-status`)
            .send({likeStatus: "likes"})

        expect(result.status).toBe(400)


    })

    it('should successful add like status to comment with 204 status code', async () => {

        const result = await reqWithBearerAuth(firstJwtAccessToken)
            .post(`/comments/${fistCommentId}/like-status`)
            .send({likeStatus: "Like"})

        expect(result.status).toBe(204)


    })


    it('comment should have 1 like / 0 dislike and no userStatus with no bearer auth', async () => {

        const result = await req.get(`/posts/${postId}/comments`)

        expect(result.status).toBe(200)

        expect(result.body.items[2]).toEqual(
                createCorrectCommentData(1, 0, "None"),


        )

    })

    it('comment should have 1 like / 0 dislike and user likeStatus  should be "Like"', async () => {

        const result = await reqWithBearerAuth(firstJwtAccessToken).get(`/posts/${postId}/comments`)

        expect(result.status).toBe(200)

        expect(result.body.items[2]).toEqual(
            createCorrectCommentData(1, 0, "Like"),

        )

    })

    it('add likes/dislikes for comments', async () => {

        await addLikeStatusToComment(fistUsersIdsArr,fistCommentId,"Like")
        await addLikeStatusToComment(secondUsersIdsArr,fistCommentId,"Dislike")

        await addLikeStatusToComment(fistUsersIdsArr,secondCommentId,"Like")
        await addLikeStatusToComment(secondUsersIdsArr,secondCommentId,"Like")

        await addLikeStatusToComment(fistUsersIdsArr,thirdCommentId,"Dislike")
        await addLikeStatusToComment(secondUsersIdsArr,thirdCommentId,"Dislike")


    })


    it('should return 3 comments with correct like/dislike count and "Like" user like status for fist comment ', async () => {

        const result = await reqWithBearerAuth(firstJwtAccessToken).get(`/posts/${postId}/comments`)

        expect(result.status).toBe(200)

        expect(result.body.items.length).toBe(3)

        expect(result.body.items).toEqual([
                createCorrectCommentData(0, 15, "None"),
                createCorrectCommentData(15, 0, "None"),
                createCorrectCommentData(11, 5, "Like"),
            ]
        )


    })


    it('should successful add like status to comment with 204 status code', async () => {

        const result = await reqWithBearerAuth(firstJwtAccessToken)
            .post(`/comments/${fistCommentId}/like-status`)
            .send({likeStatus: "None"})

        expect(result.status).toBe(204)


    })


    it('should return 3 comments with correct like/dislike count and "Like" user like status for fist comment ', async () => {

        const result = await reqWithBearerAuth(firstJwtAccessToken).get(`/posts/${postId}/comments`)

        expect(result.status).toBe(200)

        expect(result.body.items.length).toBe(3)

        expect(result.body.items).toEqual([
                createCorrectCommentData(0, 15, "None"),
                createCorrectCommentData(15, 0, "None"),
                createCorrectCommentData(10, 5, "None"),
            ]
        )


    })






})




