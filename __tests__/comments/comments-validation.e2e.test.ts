import {correctBasicAuthData, generateRandomStr, req, reqWithBearerAuth} from "../test-helpers";
import {correctCreateBlogInputData} from "../blogs/common/blog-test-data";
import {correctPostInputData} from "../posts/common/post-test-data";
import {correctCreateUserData, correctLoginData} from "../auth/common/auth-test-data";
import {createFieldsTests} from "../create-field-tests";
import {correctCommentInputData} from "./common/correctCommentInputData";

const invalidContent = [
    {value: "message", case: "cant be less than 20 symbols"},
    {value: generateRandomStr(301) , case: "cant be longer than 300 symbols"},

]


describe('POST/PUT comments validation tests', () => {

    let userId: string
    let blogId: string
    let postId: string
    let jwtAccessToken:string
    let commentId:string


    beforeAll(async () => {

        //delete all data
        await req.delete('/testing/all-data')
            .set('Authorization', correctBasicAuthData)


        //create user
        const user = await req.post('/users')
            .set('Authorization', correctBasicAuthData)
            .send(correctCreateUserData)

        userId = user.body.id


        //create blog

        const blog = await req.post('/blogs')
            .set('Authorization', correctBasicAuthData)
            .send(correctCreateBlogInputData)

        blogId = blog.body.id


        //create post

        const post = await req.post(`/blogs/${blogId}/posts`)
            .set('Authorization', correctBasicAuthData)
            .send(correctPostInputData)

        postId = post.body.id

        //get jwt login token

        const login = await req.post(`/auth/login`)
            .send(correctLoginData)

        jwtAccessToken = login.body



        const comment = await req.post(`/posts/${postId}/comments`)
            .set('Authorization', `Bearer ${jwtAccessToken}`)
            .send(correctCommentInputData)

        commentId = comment.body.id


    })


    const createCommentTests = createFieldsTests(
        correctCommentInputData,
        () => reqWithBearerAuth(jwtAccessToken),
        "post", () => `/posts/${postId}/comments`)

    createCommentTests('content', invalidContent)


    const updateCommentTests = createFieldsTests(
        correctCommentInputData,
        () => reqWithBearerAuth(jwtAccessToken),
        "put", () => `/comments/${commentId}`)

    updateCommentTests('content', invalidContent)

})




