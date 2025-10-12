import {req,reqWithoutState, reqWithBasicAuth} from "../test-helpers";
import {
    correctCreateFirstUserData,
    correctCreateSecondUserData, correctCreateThirdUserData,
    correctFirstUserLoginData, correctSecondUserLoginData
} from "./common/auth-test-data";
import {emailManager} from "../../src/modules/users_module/auth/application/email.manager";
import {testingRepository} from "../../src/modules/testing/repositories/testing.repository";


describe('auth tests', () => {

    let fistUserAccessToken: string
    let secondUserAccessToken: string
    let correctConfirmationCode :string
    const changedPassword = 'newPassword1356'
    let firstRefreshToken:string

    beforeAll(async () => {

        await testingRepository.deleteAllData()

        await reqWithBasicAuth.post('/users')
            .send(correctCreateFirstUserData)

    })



    it("login without data", async () => {

        const res = await req.post('/auth/login')


        expect(res.status).toEqual(400)

    })


    it("401 if login with wrong password", async () => {

        const res = await req.post('/auth/login')

            .send({...correctFirstUserLoginData, password: 'wrong'})


        expect(res.status).toEqual(401)

    })


    it("login with  correct data should return 201 and jwt access token in body", async () => {

        const res = await req.post('/auth/login')
            .send(correctFirstUserLoginData)


        expect(res.status).toEqual(201)
        expect(res.body).toEqual(expect.any(String))

        expect(res.headers['set-cookie']).toBeDefined()
        expect(res.headers['set-cookie'][0]).toMatch(/refreshToken=/)


        fistUserAccessToken = res.body

    })

    it("try to get auth/me without bearer auth should return 401", async () => {

        const res = await req.get('/auth/me')


        expect(res.status).toEqual(401)


    })

    it("try to get auth/me without bearer auth should return 401", async () => {

        const res = await req.get('/auth/me')
            .set('Authorization', `Bearer ${fistUserAccessToken}`)


        expect(res.status).toEqual(201)
        expect(res.body).toEqual({
            email: correctCreateFirstUserData.email,
            login: correctCreateFirstUserData.login,
            userId: expect.any(String),
        })


    })


    it("registration new user", async () => {

        jest.spyOn(emailManager, 'sendRegistrationCode')
            .mockImplementation(async () => Promise.resolve())

        const res = await req.post('/auth/registration')
            .send(correctCreateSecondUserData)


        correctConfirmationCode = await testingRepository.getUserEmailConfirmationCodeByEmail(correctCreateSecondUserData.email)

        expect(res.status).toEqual(204)


    })

    it("401 if login with wrong password", async () => {

        const res = await req.post('/auth/login')
            .send({...correctSecondUserLoginData, password: 'wrong'})


        expect(res.status).toEqual(401)

    })


    it("login with  correct data should return 201 and jwt access token in body", async () => {

        const res = await req.post('/auth/login')
            .send(correctSecondUserLoginData)


        expect(res.status).toEqual(201)
        expect(res.body).toEqual(expect.any(String))


        expect(res.headers['set-cookie']).toBeDefined()
        expect(res.headers['set-cookie'][0]).toMatch(/refreshToken=/)

        secondUserAccessToken = res.body


    })



    it("should return 201 status and current user info object", async () => {

        const res = await req.get('/auth/me')
            .set('Authorization', `Bearer ${secondUserAccessToken}`)


        expect(res.status).toEqual(201)
        expect(res.body).toEqual({
            email: correctCreateSecondUserData.email,
            login: correctCreateSecondUserData.login,
            userId: expect.any(String),
        })


    })



    it("should return 400 for an empty body", async () => {

        const res = await req.post('/auth/registration-confirmation')

        expect(res.status).toEqual(400)


    })



    it("should return 400 for incorrect email confirmation code", async () => {

        const res = await req.post('/auth/registration-confirmation')
            .send({code:'random wrong code'})

        expect(res.status).toEqual(400)


    })


    it("should return 204 and confirm email", async () => {


        const res = await req.post('/auth/registration-confirmation')
            .send({code:correctConfirmationCode})

        expect(res.status).toEqual(204)

    })


    it("should return 400 for already confirmed email", async () => {


        const res = await req.post('/auth/registration-confirmation')
            .send({code:correctConfirmationCode})

        expect(res.status).toEqual(400)

    })

    it("registration new user", async () => {

        jest.spyOn(emailManager, 'sendRegistrationCode')
            .mockImplementation(async () => Promise.resolve())

        const res = await req.post('/auth/registration')
            .send(correctCreateThirdUserData)

        correctConfirmationCode = await testingRepository.getUserEmailConfirmationCodeByEmail(correctCreateThirdUserData.email)

        expect(res.status).toEqual(204)

    })


    it("should return 400 sending without body", async () => {


        const res = await req.post('/auth/registration-email-resending')


        expect(res.status).toEqual(400)

    })


    it("should return 204 and send new email confirmation code on email", async () => {

        jest.spyOn(emailManager, 'sendRegistrationCode')
            .mockImplementation(async () => Promise.resolve())

        const res = await req.post('/auth/registration-email-resending')
            .send({email:correctCreateThirdUserData.email})

        expect(res.status).toEqual(204)

    })


    it("should return 400 for old(wrong) confirmation code", async () => {

        const res = await req.post('/auth/registration-confirmation')
            .send({code:'random wrong code'})

        expect(res.status).toEqual(400)


    })


    it("should return 204 and confirm email", async () => {


        correctConfirmationCode = await testingRepository.getUserEmailConfirmationCodeByEmail(correctCreateThirdUserData.email)

        const res = await req.post('/auth/registration-confirmation')
            .send({code:correctConfirmationCode})

        expect(res.status).toEqual(204)

    })


    it("should return 400 sending without body", async () => {

        const res = await req.post('/auth/password-recovery')

        expect(res.status).toEqual(400)


    })


    it("should send recovery code on email end return 204 ", async () => {

        jest.spyOn(emailManager, 'sendPasswordRecoveryCode')
            .mockImplementation(async () => Promise.resolve())

        const res = await req.post('/auth/password-recovery').send({email:correctCreateFirstUserData.email})

        expect(res.status).toEqual(204)

    })


    it("should return 400 sending without body", async () => {

        const res = await req.post('/auth/new-password')

        expect(res.status).toEqual(400)


    })

    it("should successful set new password and return 204 status code", async () => {

        const recoveryCode = await testingRepository.getUserPasswordRecoveryCodeByEmail(correctCreateFirstUserData.email)

        const res = await req.post('/auth/new-password').send({newPassword:changedPassword,recoveryCode:recoveryCode})

        expect(res.status).toEqual(204)

    })


    it("should return 401 trying login with old password", async () => {

        const res = await req.post('/auth/login')
            .send(correctFirstUserLoginData)

        expect(res.status).toEqual(401)

    })

    it("login with  correct data should return 201 and jwt access token in body", async () => {

        const res = await req.post('/auth/login')
            .send({...correctFirstUserLoginData,password:changedPassword})

        expect(res.status).toEqual(201)

        fistUserAccessToken = res.body

        firstRefreshToken = res.headers['set-cookie'][0]


    })


    it("should return 401 trying get new pair of tokens without refresh token in cookie", async () => {


        const res = await reqWithoutState.post('/auth/refresh-token')


        expect(res.status).toEqual(401)

    })

    it("should return 201 and new pair of refresh/access tokens", async () => {


        const res = await req.post('/auth/refresh-token')


        expect(res.status).toEqual(201)

        expect(res.body).toEqual(expect.any(String))

        expect(res.headers['set-cookie']).toBeDefined()
        expect(res.headers['set-cookie'][0]).toMatch(/refreshToken=/)

    })

    it("should return 401 trying get new pair of tokens using old/invalid refresh token", async () => {


        const res = await reqWithoutState.post('/auth/refresh-token')
            .set('Cookie', [firstRefreshToken])


        expect(res.status).toEqual(401)

    })


    it("should successful logout and make current refresh token incorrect", async () => {


        const res = await req.post('/auth/logout')

        expect(res.status).toEqual(204)

    })

    it("should return 401 trying logout using old/invalid refresh token", async () => {


        const res = await req.post('/auth/logout')

        expect(res.status).toEqual(401)

    })


})

