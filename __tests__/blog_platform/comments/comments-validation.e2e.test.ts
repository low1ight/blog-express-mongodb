import {generateRandomStr, req, reqWithBasicAuth, reqWithBearerAuth} from "../../common/test-helpers";
import {correctCreateBlogInputData} from "../blogs/common/blog-test-data";
import {createFieldsTests} from "../../common/create-field-tests";
import {commentCorrectCreateInputData} from "./common/comment-test-data";
import {correctCreateFirstUserData, correctFirstUserLoginData} from "../../users_module/auth/common/auth-test-data";
import {correctPostInputData} from "../posts/common/post-test-data";

const invalidContent = [
    {value: "message", case: "cant be less than 20 symbols"},
    {value: generateRandomStr(301) , case: "cant be longer than 300 symbols"},

]


describe('POST/PUT comments validation tests', () => {


    let blogId: string
    let postId: string
    let jwtAccessToken:string
    let commentId:string



    beforeAll(async () => {

        //delete all data
        await reqWithBasicAuth.delete('/testing/all-data')

        //create user
         await reqWithBasicAuth.post('/users')
            .send(correctCreateFirstUserData)

        //create blog

        const blog = await reqWithBasicAuth.post('/blogs')
            .send(correctCreateBlogInputData)

        blogId = blog.body.id


        //create post

        const post = await reqWithBasicAuth.post(`/blogs/${blogId}/posts`)
            .send(correctPostInputData)

        postId = post.body.id

        //get jwt login token

        const login = await req.post(`/auth/login`)
            .send(correctFirstUserLoginData)

        jwtAccessToken = login.body


       //create comment

        const comment = await req.post(`/posts/${postId}/comments`)
            .set('Authorization', `Bearer ${jwtAccessToken}`)
            .send(commentCorrectCreateInputData)

        commentId = comment.body.id




    })


    const createCommentTests = createFieldsTests(
        commentCorrectCreateInputData,
        () => reqWithBearerAuth(jwtAccessToken),
        "post", () => `/posts/${postId}/comments`)

    createCommentTests('content', invalidContent)


    const updateCommentTests = createFieldsTests(
        commentCorrectCreateInputData,
        () => reqWithBearerAuth(jwtAccessToken),
        "put", () => `/comments/${commentId}`)

    updateCommentTests('content', invalidContent)

})




