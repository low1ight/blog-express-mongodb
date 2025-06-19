import { generateRandomStr,  reqWithAuth} from "../test-helpers";
import {correctCreateBlogInputData} from "../blogs/common/blog-test-data";
import {correctPostInputData} from "./common/post-test-data";
import {createFieldsTests} from "../create-field-tests";
import {PostViewModel} from "../../src/modules/blog_platform/posts/models/post-view-model";
import {PostInputModel} from "../../src/modules/blog_platform/posts/models/post-input-model";

const invalidPostTitleArr = [
    {value: "", case: "an empty name"},
    {value: generateRandomStr(31), case: "longer than 30"}
]

const invalidPostShortDescriptionArr = [
    {value: "", case: "an empty ShortDescription"},
    {value: generateRandomStr(101), case: "longer than 100"}
]

const invalidPostContentArr = [
    {value: "", case: "an empty Content"},
    {value: generateRandomStr(1001), case: "longer than 1000"}
]

const invalidPostBlogIdArr = [
    {value: "", case: "an empty blogId"},
    {value: 'd88fb66f-00a9-4619-a2b7-47e35dade2d8', case: "blog with this id dont exist"},

]






describe('"/posts" POST validation tests', () => {

    let correctBlogId:string
    let createPostCorrectData:PostInputModel

    beforeAll(async () => {

        const res = await reqWithAuth.post('/blogs').send(correctCreateBlogInputData).expect(201)
        correctBlogId = res.body.id
        createPostCorrectData = {...correctPostInputData,blogId:correctBlogId}

    })


    const createTests = createFieldsTests(() => createPostCorrectData,reqWithAuth,"post","/posts")

    createTests('title',invalidPostTitleArr)
    createTests('shortDescription',invalidPostShortDescriptionArr)
    createTests('content',invalidPostContentArr)
    createTests('blogId',invalidPostBlogIdArr)


})



describe('"/posts" PUT validation tests', () => {

    let correctBlogId:string
    let createPostCorrectData:PostInputModel
    let createdPost:PostViewModel

    beforeAll(async () => {

        const res = await reqWithAuth.post('/blogs').send(correctCreateBlogInputData).expect(201)
        correctBlogId = res.body.id
        createPostCorrectData = {...correctPostInputData,blogId:correctBlogId}


        const postRes = await reqWithAuth.post('/posts').send(createPostCorrectData).expect(201)
        createdPost = postRes.body


    })


    const createTests = createFieldsTests(() => createPostCorrectData,
        reqWithAuth,"put",() => `/posts/${createdPost.id}`)

    createTests('title',invalidPostTitleArr)
    createTests('shortDescription',invalidPostShortDescriptionArr)
    createTests('content',invalidPostContentArr)
    createTests('blogId',invalidPostBlogIdArr)


})