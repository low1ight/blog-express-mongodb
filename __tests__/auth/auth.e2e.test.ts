import {correctBasicAuthData, req} from "../test-helpers";
import {correctCreateFirstUserData, correctFirstUserLoginData} from "./common/auth-test-data";

describe('"/blog_platform" POST validation tests', () => {

    let accessToken: string

    beforeAll(async () => {

        it("create user for auth tests", async () => {

            const res = await req.post('/users')
                .set('Authorization', correctBasicAuthData)
                .send(correctCreateFirstUserData)

            expect(res.status).toEqual(201)

        })
    })


    it("login without data", async () => {

        const res = await req.post('/auth/login')
            .set('Authorization', correctBasicAuthData)


        expect(res.status).toEqual(400)

    })


    it("400 if login with wrong password", async () => {

        const res = await req.post('/auth/login')
            .set('Authorization', correctBasicAuthData)
            .send({...correctFirstUserLoginData,password: 'wrong'})


        expect(res.status).toEqual(401)

    })


    it("login with  correct data should return 201 and return jwt access token in body", async () => {

        const res = await req.post('/auth/login')
            .send(correctFirstUserLoginData)


        expect(res.status).toEqual(201)
        expect(res.body).toEqual(expect.any(String))

        accessToken = res.body

    })

    it("try to get auth/me without bearer auth should return 401", async () => {

        const res = await req.get('/auth/me')


        expect(res.status).toEqual(401)


    })

    it("try to get auth/me without bearer auth should return 401", async () => {

        const res = await req.get('/auth/me')
            .set('Authorization', `Bearer ${accessToken}`)


        expect(res.status).toEqual(201)
        expect(res.body).toEqual({
            email: "qwerty@gmail.com",
            login: "qwerty",
            userId: expect.any(String),
        })


    })



})

