import {generateRandomStr, reqWithBasicAuth} from "../../common/test-helpers";
import {PostInputModel} from "../../../src/modules/blog_platform/posts/models/post-input-model";
import {correctPostInputData} from "./common/post-test-data";
import {correctCreateBlogInputData} from "../blogs/common/blog-test-data";
import {createFieldsTests} from "../../common/create-field-tests";
import {PostViewModel} from "../../../src/modules/blog_platform/posts/models/post-view-model";
import {MongoMemoryServer} from "mongodb-memory-server";
import {runDB} from "../../../src/db/mongodb";
import mongoose from "mongoose";


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
    let mongodb:MongoMemoryServer






    beforeAll(async () => {

        mongodb = await MongoMemoryServer.create();
        const uri = mongodb.getUri();
        await runDB(uri)

        const res = await reqWithBasicAuth.post('/blogs').send(correctCreateBlogInputData).expect(201)
        correctBlogId = res.body.id
        createPostCorrectData = {...correctPostInputData,blogId:correctBlogId}

    })

    afterAll(async () => {
        await mongodb.stop()
        await mongoose.disconnect()
    })


    const createTests = createFieldsTests(() => createPostCorrectData,reqWithBasicAuth,"post","/posts")

    createTests('title',invalidPostTitleArr)
    createTests('shortDescription',invalidPostShortDescriptionArr)
    createTests('content',invalidPostContentArr)
    createTests('blogId',invalidPostBlogIdArr)


})



describe('"/posts" PUT validation tests', () => {

    let createPostCorrectData:PostInputModel
    let createdPost:PostViewModel
    let mongodb:MongoMemoryServer






    beforeAll(async () => {
        mongodb = await MongoMemoryServer.create();
        const uri = mongodb.getUri();
        await runDB(uri)

        const res = await reqWithBasicAuth.post('/blogs').send(correctCreateBlogInputData).expect(201)
        createPostCorrectData = {...correctPostInputData,blogId:res.body.id}


        const postRes = await reqWithBasicAuth.post('/posts').send(createPostCorrectData).expect(201)
        createdPost = postRes.body


    })

    afterAll(async () => {
        await mongodb.stop()
        await mongoose.disconnect()
    })


    const createTests = createFieldsTests(() => createPostCorrectData,
        reqWithBasicAuth,"put",() => `/posts/${createdPost.id}`)

    createTests('title',invalidPostTitleArr)
    createTests('shortDescription',invalidPostShortDescriptionArr)
    createTests('content',invalidPostContentArr)
    createTests('blogId',invalidPostBlogIdArr)


})