import {correctBasicAuthData, req} from "../test-helpers";
import {
    correctCreateBlogInputData,
    correctBlogUpdateData,
    correctCreatedBlogViewModel,
    correctUpdatedBlogViewModel
} from "./common/blog-test-data";
import {BlogViewModel} from "../../src/modules/blog_platform/blogs/models/blog-view-model";
import {testingRepository} from "../../src/modules/testing/repositories/testing.repository";

describe('/blogs', () => {

    let blogId:string


    beforeAll(async () => {

        await testingRepository.deleteAllData()
    })

    it('should return 200 and an empty arr', async () => {

        const res = await req.get('/blogs')
            .expect(200)

        expect(res.body).toEqual([])

    })


    it("should return 401 trying create blog without auth data", async () => {

        const res = await req.post('/blogs').send(correctCreateBlogInputData)

        expect(res.status).toEqual(401)

    })

    it("should return 400 for trying create blog with wrong or without input data", async () => {

        const res = await req.post('/blogs')
            .set('Authorization', correctBasicAuthData)

        expect(res.status).toEqual(400)

    })


    it("should create blog with 200 status, and return it", async () => {

        const res = await req.post('/blogs')
            .set('Authorization', correctBasicAuthData)
            .send(correctCreateBlogInputData)

        expect(res.status).toEqual(201)

        expect(res.body).toEqual(correctCreatedBlogViewModel)

        blogId = res.body.id


    })

    it('should get blog by id with status 200', async () => {

        const res = await req.get(`/blogs/${blogId}`)

        expect(res.status).toEqual(200)

        expect(res.body).toEqual(correctCreatedBlogViewModel)

    })


    it('should return 404 for non-existing blog', async () => {

        const res = await req.get(`/blogs/123asd`)

        expect(res.status).toEqual(404)


    })

    it('should return 200 return 1 blog', async () => {

        const res = await req.get('/blogs')

        expect(res.status).toEqual(200)

        expect(res.body.length).toEqual(1)

        expect(res.body[0]).toEqual(correctCreatedBlogViewModel)


    })

    it("should create 9 blog with 200 status code", async () => {

        const requests = Array.from({length: 9}, () => req.post('/blogs')
            .set('Authorization', correctBasicAuthData)
            .send(correctCreateBlogInputData))


        const response = await Promise.all(requests)

        response.forEach(res => {
            expect(res.status).toEqual(201)

            expect(res.body).toEqual(correctCreatedBlogViewModel)
        })


    })

    it('should return 200 and 10 blog', async () => {

        const response = await req.get('/blogs')

        expect(response.status).toEqual(200)

        expect(response.body.length).toEqual(10)

       response.body.forEach((res:BlogViewModel) => {
           expect(res).toEqual(correctCreatedBlogViewModel)
       })


    })


    it('should return 401 trying update without auth', async () => {

        const res = await req.put('/blogs/123').send(correctBlogUpdateData)

        expect(res.status).toEqual(401)

    })


    it('should return 404 trying update non-existing blog', async () => {

        const res = await req.put('/blogs/123')
            .set('Authorization', correctBasicAuthData)
            .send(correctBlogUpdateData)

        expect(res.status).toEqual(404)

    })


    it('should return 400 without providing updating data', async () => {

        const res = await req.put(`/blogs/${blogId}`).set('Authorization', correctBasicAuthData)

        expect(res.status).toEqual(400)

    })

    it('should return 204 and successful update the blog', async () => {

        await req.put(`/blogs/${blogId}`)
            .set('Authorization', correctBasicAuthData)
            .send(correctBlogUpdateData).expect(204)


        const res = await req.get(`/blogs/${blogId}`).expect(200)

        expect(res.body).toEqual(correctUpdatedBlogViewModel)

    })

    it('should return 401 trying deleting without auth', async () => {

        await req.delete(`/blogs/123asd`).expect(401)

    })

    it('should return 404 if delete non-existed blog', async () => {

        await req.delete(`/blogs/123asd`).set('Authorization', correctBasicAuthData).expect(404)

    })

    it('should successful delete blog with 204 status', async () => {

        await req.delete(`/blogs/${blogId}`).set('Authorization', correctBasicAuthData).expect(204)

    })


    it('should return 200 and 9 blog_platform', async () => {

        const response = await req.get('/blogs')

        expect(response.status).toEqual(200)

        expect(response.body.length).toEqual(9)

        expect(response.body.find((i:BlogViewModel) => i.id === blogId)).toEqual(undefined)

    })



})