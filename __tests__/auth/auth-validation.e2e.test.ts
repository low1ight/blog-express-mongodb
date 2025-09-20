import {createFieldsTests} from "../create-field-tests";
import {correctBasicAuthData, req} from "../test-helpers";
import {correctCreateUserData, correctLoginData} from "./common/auth-test-data";

const invalidLoginOrEmailValues = [
    {value: "", case: "cant be an empty"},

]

const invalidPasswordsValues = [
    {value: "", case: "cant be an empty"},

]






describe('"/blog_platform" POST validation tests', () => {

    beforeAll(async () => {

        it("create user for auth tests", async () => {

            const res = await req.post('/users')
                .set('Authorization', correctBasicAuthData)
                .send(correctCreateUserData)

            expect(res.status).toEqual(201)

        })
    })


    const createBlogsTest = createFieldsTests(correctLoginData, req , "post", '/auth/login')


    createBlogsTest('loginOrEmail', invalidLoginOrEmailValues)

    createBlogsTest('password', invalidPasswordsValues)

})