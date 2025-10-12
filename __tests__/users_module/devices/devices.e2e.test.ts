import {testingRepository} from "../../../src/modules/testing/repositories/testing.repository";
import {reqWithBasicAuth, reqWithoutState} from "../../test-helpers";
import {
    correctCreateFirstUserData, correctCreateSecondUserData, correctFirstUserLoginData, correctSecondUserLoginData,

} from "../auth/common/auth-test-data";
import {DeviceViewModel} from "../../../src/modules/users_module/devices/models/device-view-model";
import {
    JwtRefreshTokenPayloadModel
} from "../../../src/modules/users_module/auth/models/jwt-refresh-token-payload-model";
import {jwtHelper} from "../../common/jwt-helper";


describe('auth tests', () => {


    let firstUserRefreshToken: string
    let currentDeviceId: string
    let secondUserRefreshToken: string
    let anotherUserDeviceId:string

    beforeAll(async () => {

        await testingRepository.deleteAllData()

        await reqWithBasicAuth.post('/users')
            .send(correctCreateFirstUserData)

        await reqWithBasicAuth.post('/users')
            .send(correctCreateSecondUserData)

    })


    it('log in 5 times should create 5 devices for first user', async () => {

        const requests = Array.from({length: 5}, () => reqWithoutState.post('/auth/login').send(correctFirstUserLoginData))

        const response = await Promise.all(requests)

        response.forEach(res => {
            expect(res.status).toEqual(201)

        })

        firstUserRefreshToken = response[0].headers['set-cookie'][0]


    })


    it('log in 5 times should create 5 devices for second user', async () => {

        const requests = Array.from({length: 5}, () => reqWithoutState.post('/auth/login').send(correctSecondUserLoginData))

        const response = await Promise.all(requests)

        response.forEach(res => {
            expect(res.status).toEqual(201)

        })

        secondUserRefreshToken = response[0].headers['set-cookie'][0]


    })


    it('get devices without refreshToken in cookie should return 401 status code', async () => {

        await reqWithoutState.get('/security/devices')

    })

    it('get devices without refreshToken in cookie should return 401 status code', async () => {

        const response = await reqWithoutState.get('/security/devices').set('Cookie', [firstUserRefreshToken])


        expect(response.status).toEqual(200)
        expect(response.body.length).toEqual(5)


        response.body.forEach((item: DeviceViewModel) => {
            expect(item).toEqual({
                deviceId: expect.any(String),
                title: expect.any(String),
                ip: expect.any(String),
                lastSeenDate: expect.any(String),
            })
        })


    })


    it('get devices without refreshToken in cookie should return 401 status code', async () => {

        await reqWithoutState.delete('/security/devices')

    })


    it('should successful delete all other device exclude current with 204 status code', async () => {

        const result = await reqWithoutState.delete('/security/devices').set('Cookie', [firstUserRefreshToken])

        expect(result.status).toEqual(204)

    })


    it('should return 1 device that have same device id as in cookie', async () => {

        const response = await reqWithoutState.get('/security/devices').set('Cookie', [firstUserRefreshToken])


        expect(response.status).toEqual(200)
        expect(response.body.length).toEqual(1)


        const payload: JwtRefreshTokenPayloadModel = jwtHelper.getRefreshTokenPayload(firstUserRefreshToken)

        currentDeviceId = response.body[0].deviceId


        expect(response.body[0]).toEqual({
            deviceId: payload.deviceId,
            title: expect.any(String),
            ip: expect.any(String),
            lastSeenDate: expect.any(String),
        })


    })

    it('should get 5 devices for secondUser', async () => {

        const response = await reqWithoutState.get('/security/devices').set('Cookie', [secondUserRefreshToken])


        expect(response.status).toEqual(200)
        expect(response.body.length).toEqual(5)

        anotherUserDeviceId = response.body[0].deviceId


    })


    it('should return 401 trying delete without refresh token in cookie', async () => {

        const response = await reqWithoutState.delete(`/security/devices/${currentDeviceId}`)


        expect(response.status).toEqual(401)


    })

    it('should return 403 trying delete another user device', async () => {

        const response = await reqWithoutState.delete(`/security/devices/${anotherUserDeviceId}`).set('Cookie', [firstUserRefreshToken])


        expect(response.status).toEqual(403)


    })


    it('should return 404 trying delete non existing device', async () => {

        const response = await reqWithoutState.delete(`/security/devices/random2333112`).set('Cookie', [firstUserRefreshToken])


        expect(response.status).toEqual(404)


    })


    it('should successful delete current device and make refresh token invalid', async () => {

        const response = await reqWithoutState.delete(`/security/devices/${currentDeviceId}`).set('Cookie', [firstUserRefreshToken])


        expect(response.status).toEqual(204)


    })


    it('should return 401', async () => {

        const response = await reqWithoutState.delete(`/security/devices/${currentDeviceId}`).set('Cookie', [firstUserRefreshToken])


        expect(response.status).toEqual(401)


    })


    it('should return 401', async () => {

        const response = await reqWithoutState.get('/security/devices').set('Cookie', [firstUserRefreshToken])


        expect(response.status).toEqual(401)


    })


})

