import {req, reqWithBasicAuth,} from "../test-helpers";
import {correctCreateBlogInputData} from "../blogs/common/blog-test-data";
import {correctPostInputData} from "../posts/common/post-test-data";
import {
    correctCreateFirstUserData, correctCreateSecondUserData,
    correctFirstUserLoginData,
    correctSecondUserLoginData
} from "../auth/common/auth-test-data";
import {commentCorrectCreateInputData, commentCorrectUpdateInputData} from "./common/comment-test-data";
import {randomUUID} from "node:crypto";
import {CommentViewModel} from "../../src/modules/blog_platform/comments/models/comment-view-model";




describe('POST/PUT comments validation tests', () => {

    let firstUserId:string
    let secondUserId:string
    let secondUser:string
    let blogId: string
    let firstPost: string
    let secondPost: string

    let commentId:string
    let commentCorrectViewModel:CommentViewModel

    let firstJwtAccessToken:string
    let secondJwtAccessToken:string


    beforeAll(async () => {

        //delete all data
        await reqWithBasicAuth.delete('/testing/all-data')

        //create users
        const firstUser = await reqWithBasicAuth.post('/users')
            .send(correctCreateFirstUserData)

        firstUserId = firstUser.body.id


        const secondUser = await reqWithBasicAuth.post('/users')
            .send(correctCreateSecondUserData)

        secondUserId = secondUser.body.id


        //create blog

        const blog = await reqWithBasicAuth.post('/blogs')
            .send(correctCreateBlogInputData)

        blogId = blog.body.id

        //create first and second posts

        const post1 = await reqWithBasicAuth.post(`/blogs/${blogId}/posts`)
            .send(correctPostInputData)

        firstPost = post1.body.id


        const post2 = await reqWithBasicAuth.post(`/blogs/${blogId}/posts`)
            .send(correctPostInputData)

        secondPost = post2.body.id

        //get jwt login token

        const firstLogin = await req.post(`/auth/login`)
            .send(correctFirstUserLoginData)

        firstJwtAccessToken = firstLogin.body


        const secondLogin = await req.post(`/auth/login`)
            .send(correctSecondUserLoginData)

        secondJwtAccessToken = secondLogin.body



        commentCorrectViewModel = {
            id: expect.any(String),
            content:commentCorrectCreateInputData.content,
            commentatorInfo:{
                userId: firstUserId,
                userLogin: correctCreateFirstUserData.login
            },
            createdAt:expect.any(String)
        }


    })



    it('should return 401 trying create comment without bearer auth',async () => {

        const comment = await req.post(`/posts/${firstPost}/comments`)
            .send(commentCorrectCreateInputData)

        expect(comment.status).toBe(401)


    })

    it('should return 400 trying crate comment without data',async () => {

        const comment = await req.post(`/posts/${firstPost}/comments`)
            .set('Authorization', `Bearer ${firstJwtAccessToken}`)

        expect(comment.status).toBe(400)


    })


    it('should return 404 trying create comment for non existing post',async () => {

        await req.post(`/posts/${randomUUID()}/comments`)
            .set('Authorization', `Bearer ${firstJwtAccessToken}`)
            .send(commentCorrectCreateInputData)

    })


    it('should successful create comment with 201 status code',async () => {

        const comment = await req.post(`/posts/${firstPost}/comments`)
            .set('Authorization', `Bearer ${firstJwtAccessToken}`)
            .send(commentCorrectCreateInputData)

        expect(comment.status).toEqual(201)
        expect(comment.body).toEqual(commentCorrectViewModel)

        commentId = comment.body.id

    })


    it('should successful return 404 status code for non existed comment',async () => {

        const comment = await req.get(`/comments/${randomUUID()}`)
            .send(commentCorrectCreateInputData)

        expect(comment.status).toEqual(404)


    })


    it('should successful return comment with 200 status code',async () => {

        const comment = await req.get(`/comments/${commentId}`)
            .send(commentCorrectCreateInputData)

        expect(comment.status).toEqual(200)

        expect(comment.body).toEqual(commentCorrectViewModel)

    })


    it('should return 401 trying edit comment without bearer auth', async () => {

        const comment = await req.put(`/comments/${commentId}`)

            .send(commentCorrectUpdateInputData)

        expect(comment.status).toEqual(401)


    })


    it('should return 403 trying update comment that not in your own', async () => {

        const comment = await req.put(`/comments/${commentId}`)
            .set('Authorization', `Bearer ${secondJwtAccessToken}`)
            .send(commentCorrectUpdateInputData)

        expect(comment.status).toEqual(403)


    })

    it('should return 400 trying update without update content', async () => {

        const comment = await req.put(`/comments/${commentId}`)
            .set('Authorization', `Bearer ${firstJwtAccessToken}`)


        expect(comment.status).toEqual(400)

    })




    it('should return 404 trying update non existed comment', async () => {

        const comment = await req.put(`/comments/${randomUUID()}`)
            .set('Authorization', `Bearer ${firstJwtAccessToken}`)
            .send(commentCorrectUpdateInputData)


        expect(comment.status).toEqual(404)

    })



    it('should successful update comment', async () => {

        const comment = await req.put(`/comments/${commentId}`)
            .set('Authorization', `Bearer ${firstJwtAccessToken}`)
            .send(commentCorrectUpdateInputData)


        expect(comment.status).toEqual(204)

    })

    it('should successful return updated comment with 200 status code', async () => {

        const comment = await req.get(`/comments/${commentId}`)

        expect(comment.status).toEqual(200)

        const correctComment = {...commentCorrectViewModel,...commentCorrectUpdateInputData}

        expect(comment.body).toEqual(correctComment)

    })



    it('should return 401 trying delete comment without bearer auth', async () => {

        const comment = await req.delete(`/comments/${commentId}`)


        expect(comment.status).toEqual(401)


    })


    it('should return 403 trying delete comment that not in your own', async () => {

        const comment = await req.delete(`/comments/${commentId}`)
            .set('Authorization', `Bearer ${secondJwtAccessToken}`)

        expect(comment.status).toEqual(403)


    })


    it('should return 404 trying update non existed comment', async () => {

        const comment = await req.delete(`/comments/${randomUUID()}`)
            .set('Authorization', `Bearer ${firstJwtAccessToken}`)


        expect(comment.status).toEqual(404)

    })



    it('should successful delete comment', async () => {

        const comment = await req.delete(`/comments/${commentId}`)
            .set('Authorization', `Bearer ${firstJwtAccessToken}`)

        expect(comment.status).toEqual(204)

    })



    it('should return 404 for deleted comment', async () => {

        const comment = await req.get(`/comments/${commentId}`)

        expect(comment.status).toEqual(404)

    })





})




