import {PostInputModel} from "../../../src/modules/blog_platform/posts/models/post-input-model";
import {BlogViewModel} from "../../../src/modules/blog_platform/blogs/models/blog-view-model";
import {PostViewModel} from "../../../src/modules/blog_platform/posts/models/post-view-model";
import {correctBasicAuthData, req, reqWithBasicAuth} from "../../common/test-helpers";
import {correctBlogUpdateData, correctCreateBlogInputData} from "../blogs/common/blog-test-data";
import {correctPostInputData} from "./common/post-test-data";
import {testingRepository} from "../../../src/modules/testing/repositories/testing.repository";


describe('/posts', () => {


    let createPostData:PostInputModel
    let updatePostData:PostInputModel

    let firstBlog:BlogViewModel
    let secondBlog:BlogViewModel

    let post:PostViewModel

    let correctCreatedPost:PostViewModel
    let correctUpdatedPost:PostViewModel

    beforeAll(async () => {

        await testingRepository.deleteAllData()

        const createFirstBlogRes = await reqWithBasicAuth.post('/blogs')
            .send(correctCreateBlogInputData)


        firstBlog = createFirstBlogRes.body

        const createSecondBlogRes = await reqWithBasicAuth.post('/blogs')
            .send(correctBlogUpdateData)


        secondBlog = createSecondBlogRes.body

        createPostData = {...correctPostInputData,blogId: createFirstBlogRes.body.id};
        updatePostData = {...correctPostInputData,blogId: createSecondBlogRes.body.id};


         correctCreatedPost = {
            id:expect.any(String),
            blogName: firstBlog.name,
            ...correctPostInputData,
            createdAt:expect.any(String)
        }

        correctUpdatedPost = {
            id:expect.any(String),
            blogName: secondBlog.name,
            ...correctPostInputData,
            createdAt:expect.any(String)
        }
    })




    it('should return an empty array', async () => {
        const res = await req.get('/posts')

      expect(res.status).toEqual(200)

      expect(res.body.items).toEqual([])

    })


    it('should return 400 tyring creating post without auth data',async () => {
        const res = await req.post('/posts').send(createPostData)

        expect(res.status).toEqual(401)

    })

    it('should return 401 tyring creating post without/wrong input data',async () => {
        const res = await req.post('/posts').set('Authorization', correctBasicAuthData)

        expect(res.status).toEqual(400)

    })


    it('should create post with 200 status and return it',async () => {

        const res = await req.post('/posts')
            .send(createPostData)
            .set('Authorization', correctBasicAuthData)

        post = res.body


        expect(res.status).toEqual(201)
        expect(res.body).toEqual(correctCreatedPost)




    })

    it('get by id should return 200 and post', async () => {

            const res = await req.get(`/posts/${post.id}`)

            expect(res.status).toEqual(200)

            expect(res.body).toEqual(correctCreatedPost)

    })


    it('get by id should return 404 for non-existed post', async () => {

        const res = await req.get(`/posts/asd123`)

        expect(res.status).toEqual(404)

    })


    it('create 9 post for firstBlog', async () => {
        const requests = Array.from({length: 9}, () => req.post('/posts')
            .set('Authorization', correctBasicAuthData)
            .send(createPostData))


        const response = await Promise.all(requests)

        response.forEach(res => {
            expect(res.status).toEqual(201)

            expect(res.body).toEqual(correctCreatedPost)

        })
    })

    it('should return 10 posts', async () => {
        const response = await req.get('/posts')

        expect(response.status).toEqual(200)

        expect(response.body.items.length).toEqual(10)

        response.body.items.forEach((res:PostViewModel) => {
            expect(res).toEqual(correctCreatedPost)
        })

    })



    it('should return 401 trying update without auth', async () => {

        const res = await req.put(`/posts/${post.id}`)
            .send(updatePostData)

        expect(res.status).toEqual(401)
    })

    it('should return 401 trying update without auth', async () => {

        const res = await req.put(`/posts/${post.id}`)
            .set('Authorization', correctBasicAuthData)

        expect(res.status).toEqual(400)
    })

    it('should return 404 trying update not-existed post', async () => {

        const res = await req.put(`/posts/asd123`)
            .send(updatePostData)
            .set('Authorization', correctBasicAuthData)

        expect(res.status).toEqual(404)
    })

    it('should successful update post', async () => {

        const res = await req.put(`/posts/${post.id}`)
            .send(updatePostData)
            .set('Authorization', correctBasicAuthData)

        expect(res.status).toEqual(204)
    })


    it('should return 10 posts, 1 of them should be updated', async () => {
        const response = await req.get('/posts')

        expect(response.status).toEqual(200)

        expect(response.body.items.length).toEqual(10)

        const updatedPost = await response.body.items.find((p:PostViewModel) => p.id === post.id)

        expect(updatedPost).toEqual(correctUpdatedPost)

    })


    it('401 trying delete without auth data', async () => {
        const res = await req.delete(`/posts/${post.id}`)

        expect(res.status).toEqual(401)
    })

    it('404 trying delete not-existed post', async () => {
        const res = await req.delete(`/posts/asd1123`)
            .set('Authorization', correctBasicAuthData)

        expect(res.status).toEqual(404)
    })

    it('should successful delete the post with 204 status code', async () => {
        const res = await req.delete(`/posts/${post.id}`)
            .set('Authorization', correctBasicAuthData)

        expect(res.status).toEqual(204)
    })

    it('check is post deleted, should return 404', async () => {
        const res = await req.get(`/posts/${post.id}`)
            .set('Authorization', correctBasicAuthData)

        expect(res.status).toEqual(404)
    })

    it('should return 9 posts', async () => {
        const response = await req.get('/posts')

        expect(response.status).toEqual(200)

        expect(response.body.items.length).toEqual(9)
    })

})

it('', async () => {

})