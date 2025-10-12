import {createFieldsTests} from "../create-field-tests";
import {correctBasicAuthData, req} from "../test-helpers";
import {correctCreateFirstUserData, correctFirstUserLoginData} from "./common/auth-test-data";
import {testingRepository} from "../../src/modules/testing/repositories/testing.repository";

const invalidLoginOrEmailValues = [
    {value: "", case: "cant be an empty"},

]

const invalidPasswordsValues = [
    {value: "", case: "cant be an empty"},

]


describe('"/blog_platform" POST validation tests', () => {

    beforeAll(async () => {

        await testingRepository.deleteAllData()

        const res = await req.post('/users')
            .set('Authorization', correctBasicAuthData)
            .send(correctCreateFirstUserData)

    })


    const createBlogsTest = createFieldsTests(correctFirstUserLoginData, req, "post", '/auth/login')


    createBlogsTest('loginOrEmail', invalidLoginOrEmailValues)

    createBlogsTest('password', invalidPasswordsValues)

})