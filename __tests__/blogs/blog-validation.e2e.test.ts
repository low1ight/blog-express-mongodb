import {generateRandomStr, reqWithAuth} from "../test-helpers";
import {BlogViewModel} from "../../src/modules/blog_platform/blogs/models/blog-view-model";
import {correctBlogInputData} from "./common/blog-test-data";
import {createFieldsTests} from "../create-field-tests";


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

    const createPostTests = createFieldsTests(correctBlogInputData, reqWithAuth, "post", '/blogs')


    createPostTests('name', invalidBlogNameArr)

    createPostTests('description', invalidBlogDescriptionArr)

    createPostTests('websiteUrl', invalidBlogUrlArr)
})





describe('"/blog" POST validation tests',  () => {

    let blog: BlogViewModel | undefined


    beforeAll(async () => {

        const res = await reqWithAuth.post('/blogs')
            .send(correctBlogInputData).expect(201)


        blog = res.body


    })

   const createTests = createFieldsTests(correctBlogInputData, reqWithAuth, "put", () => `/blogs/${blog?.id}`)

    createTests('name', invalidBlogNameArr)

    createTests('description', invalidBlogDescriptionArr)

    createTests('websiteUrl', invalidBlogUrlArr)



})




