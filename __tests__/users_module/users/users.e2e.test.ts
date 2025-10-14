import {testingRepository} from "../../../src/modules/testing/repositories/testing.repository";
import {req, reqWithBasicAuth} from "../../common/test-helpers";
import {Paginator} from "../../../src/utils/paginator/paginator";
import {UserViewModel} from "../../../src/modules/users_module/users/models/user-view-model";
import {
    correctUserInputData,
    correctCreatedUsersViewModels
} from "./common/users-test-data";


describe('users tests', () => {


    let firstUserId:string


    beforeAll(async () => {

        await testingRepository.deleteAllData()

    })

    it('should return 401 trying get user without base auth', async () => {

        const result = await req.get('/users')
        expect(result.status).toBe(401)


    })

    it('should return 200 and empty users arr with pagination', async () => {

        const response = await reqWithBasicAuth.get('/users')

        expect(response.status).toBe(200)

        const users: Paginator<UserViewModel> = response.body

        expect(users.pageCount).toEqual(1)
        expect(users.page).toEqual(1)
        expect(users.pageSize).toEqual(10)
        expect(users.totalCount).toEqual(0)


    })


    it('should return 401 trying create user without base auth', async () => {

        const result = await req.post('/users').send(correctUserInputData[0])

        expect(result.status).toBe(401)


    })

    it('should successful create 1 user', async () => {

        const result = await reqWithBasicAuth.post('/users').send(correctUserInputData[0])

        expect(result.status).toBe(201)

        expect(result.body).toEqual(correctCreatedUsersViewModels[0])

        firstUserId = result.body.id


    })

    it('should successful create 2 user', async () => {

        const result = await reqWithBasicAuth.post('/users').send(correctUserInputData[1])

        expect(result.status).toBe(201)

        expect(result.body).toEqual(correctCreatedUsersViewModels[1])


    })

    it('should return 200 and 1 user arr with pagination', async () => {

        const response = await reqWithBasicAuth.get('/users')

        expect(response.status).toBe(200)
        const users: Paginator<UserViewModel> = response.body

        expect(users.items[1]).toEqual(correctCreatedUsersViewModels[0])

        expect(users.pageCount).toEqual(1)
        expect(users.page).toEqual(1)
        expect(users.pageSize).toEqual(10)
        expect(users.totalCount).toEqual(2)






    })



    it('should return 401 trying delete users without base auth', async () => {

        const result = await req.delete(`/users/${firstUserId}`)

        expect(result.status).toBe(401)


    })

    it('should return 404 trying delete users with non existed id', async () => {

        const result = await reqWithBasicAuth.delete(`/users/70cfbbe8-1386-48e6-83c3-957d0896e003`)

        expect(result.status).toBe(404)


    })

    it('should successful delete fist user', async () => {


        const result = await reqWithBasicAuth.delete(`/users/${firstUserId}`)

        expect(result.status).toBe(204)


    })


    it('should return only 2 user', async () => {

        const response = await reqWithBasicAuth.get('/users')

        expect(response.status).toBe(200)
        const users: Paginator<UserViewModel> = response.body

        expect(users.items[0]).toEqual(correctCreatedUsersViewModels[1])

        expect(users.pageCount).toEqual(1)
        expect(users.page).toEqual(1)
        expect(users.pageSize).toEqual(10)
        expect(users.totalCount).toEqual(1)






    })





})

