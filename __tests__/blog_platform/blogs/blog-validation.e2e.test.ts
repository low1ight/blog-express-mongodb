import {generateRandomStr, reqWithBasicAuth} from "../../common/test-helpers";
import {BlogViewModel} from "../../../src/modules/blog_platform/blogs/models/blog-view-model";
import {correctCreateBlogInputData} from "./common/blog-test-data";
import {createFieldsTests} from "../../common/create-field-tests";
import {MongoMemoryServer} from "mongodb-memory-server";
import {runDB} from "../../../src/db/db.mongodb";


const invalidBlogNameArr = [
    {value: "", case: "an empty name"},
    {value: generateRandomStr(16), case: "longer than 15"}
]

const invalidBlogDescriptionArr = [
    {value: "", case: "and empty description"},
    {value: generateRandomStr(501), case: "longer than 500"}
]

const invalidBlogUrlArr = [
    {value: "htp://example", case: "invalid protocol"},
    {value: "http//example.com", case: "missing colon in protocol"},
    {value: "https://", case: "empty domain"},
    {value: "http://.com", case: "missing domain name"},
    {value: "http://example_com", case: "underscore in domain"}
]






describe('"/blog_platform" POST validation tests', () => {


    let mongodb:MongoMemoryServer


    beforeAll(async () => {
        mongodb = await MongoMemoryServer.create();
        const uri = mongodb.getUri();
        await runDB(uri)

    })

    afterAll(async () => {
        await mongodb.stop()
    })


    const createBlogsTest = createFieldsTests(correctCreateBlogInputData, reqWithBasicAuth, "post", '/blogs')


    createBlogsTest('name', invalidBlogNameArr)

    createBlogsTest('description', invalidBlogDescriptionArr)

    createBlogsTest('websiteUrl', invalidBlogUrlArr)
})





describe('"/blog" PUT validation tests',  () => {


    let blog: BlogViewModel | undefined


    let mongodb:MongoMemoryServer


    beforeAll(async () => {


        mongodb = await MongoMemoryServer.create();
        const uri = mongodb.getUri();
        await runDB(uri)



        const res = await reqWithBasicAuth.post('/blogs')
            .send(correctCreateBlogInputData).expect(201)

        blog = res.body



    })

    afterAll(async () => {
        await mongodb.stop()
    })




   const createTests = createFieldsTests(correctCreateBlogInputData, reqWithBasicAuth, "put", () => `/blogs/${blog?.id}`)

    createTests('name', invalidBlogNameArr)

    createTests('description', invalidBlogDescriptionArr)

    createTests('websiteUrl', invalidBlogUrlArr)



})




