
import {correctCreateFirstUserData, correctFirstUserLoginData} from "./common/auth-test-data";
import {correctBasicAuthData, req} from "../../common/test-helpers";
import {createFieldsTests} from "../../common/create-field-tests";
import {MongoMemoryServer} from "mongodb-memory-server";
import {runDB} from "../../../src/db/mongodb";
import mongoose from "mongoose";


const invalidLoginOrEmailValues = [
    {value: "", case: "cant be an empty"},

]

const invalidPasswordsValues = [
    {value: "", case: "cant be an empty"},

]


describe('"/blog_platform" POST validation tests', () => {

    let mongodb:MongoMemoryServer






    beforeAll(async () => {

        mongodb = await MongoMemoryServer.create();
        const uri = mongodb.getUri();
        await runDB(uri)


         await req.post('/users')
            .set('Authorization', correctBasicAuthData)
            .send(correctCreateFirstUserData)

    })

    afterAll(async () => {
        await mongodb.stop()
        await mongoose.disconnect()
    })


    const createBlogsTest = createFieldsTests(correctFirstUserLoginData, req, "post", '/auth/login')


    createBlogsTest('loginOrEmail', invalidLoginOrEmailValues)

    createBlogsTest('password', invalidPasswordsValues)

})