import {req, reqWithBasicAuth} from "../../common/test-helpers";
import {
    correctBlogsInputDataArr, createdBlogsViewModelArr,
} from "./common/blog-test-data";
import {MongoMemoryServer} from "mongodb-memory-server";
import {runDB} from "../../../src/db/db.mongodb";


describe('/blogs', () => {


    let mongodb:MongoMemoryServer


    beforeAll(async () => {
        mongodb = await MongoMemoryServer.create();
        const uri = mongodb.getUri();
        await runDB(uri)

    })

    afterAll(async () => {
        await mongodb.stop()
    })

    it('should create 11 blogs', async () => {

        for(const data of correctBlogsInputDataArr) {
            await reqWithBasicAuth.post('/blogs')
                .send(data)
        }

    })

    it('should return blogs with pagination and default query settings (max 10 blogs, by create date, desc) ', async () => {


        const blogs = await req.get('/blogs')

        const result = blogs.body

        expect(result.pageCount).toEqual(2)
        expect(result.page).toEqual(1)
        expect(result.pageSize).toEqual(10)
        expect(result.totalCount).toEqual(11)

        //correct blogs view model
        const correctBlogs = [...createdBlogsViewModelArr].reverse().slice(0,10)

        expect(result.items).toEqual(correctBlogs)


    })


    it('get with pageSize 5 and page number 3', async () => {


        const blogs = await req.get('/blogs?pageSize=5&pageNumber=3')

        const result = blogs.body

        expect(result.pageCount).toEqual(3)
        expect(result.page).toEqual(3)
        expect(result.pageSize).toEqual(5)
        expect(result.totalCount).toEqual(11)

        //  correct blogs view model
        const correctBlogs = [...createdBlogsViewModelArr].reverse().slice(10)


        expect(result.items).toEqual(correctBlogs)


    })



    it('get with sort direction asc', async () => {


        const blogs = await req.get('/blogs?sortDirection=asc')

        const result = blogs.body

        expect(result.pageCount).toEqual(2)
        expect(result.page).toEqual(1)
        expect(result.pageSize).toEqual(10)
        expect(result.totalCount).toEqual(11)

        // correct blogs view model
        const correctBlogs = [...createdBlogsViewModelArr].slice(0,10)



        expect(result.items).toEqual(correctBlogs)


    })




    it('get by name with sort direction asc and page size 5', async () => {


        const blogs = await req.get('/blogs?sortBy=name&sortDirection=asc&pageSize=5')

        const result = blogs.body

        expect(result.pageCount).toEqual(3)
        expect(result.page).toEqual(1)
        expect(result.pageSize).toEqual(5)
        expect(result.totalCount).toEqual(11)

        //  correct blogs view model
        const correctBlogs = [...createdBlogsViewModelArr].sort((a,b) => a.name.localeCompare(b.name)).slice(0,5)


        expect(result.items).toEqual(correctBlogs)


    })



    it('get blog finding by name substr any case', async () => {


        const blogs = await req.get('/blogs?searchNameTerm=tech')

        const result = blogs.body

        expect(result.pageCount).toEqual(1)
        expect(result.page).toEqual(1)
        expect(result.pageSize).toEqual(10)
        expect(result.totalCount).toEqual(7)

        //  correct blogs view model
        const correctBlogs = [...createdBlogsViewModelArr].reverse().filter(i => i.name.toLowerCase().includes('tech'))

        expect(result.items).toEqual(correctBlogs)


    })










})