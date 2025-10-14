import {Test} from "supertest";
import TestAgent = require("supertest/lib/agent");


type InvalidData = {
    value:any,
    case: string
}

export const createFieldsTests = <T extends object>(
    correctInputData:T | (() => T),
    req:TestAgent<Test> | (() => TestAgent<Test>),
    reqType:"post" | "put",
    url:string | (() => string)) => {
    return (fieldName:keyof T,valueArr:InvalidData[]) => it.each(valueArr)
    (`Invalid ${String(fieldName)} should return validation error with 400 status code`, async ({value}) => {

        const getUrl = typeof url === "function" ? url() : url;
        const getReq = typeof req === "function" ? req() : req
        const getInputData = typeof correctInputData === "function" ? correctInputData() : correctInputData;

        const inputData = {...getInputData}

        inputData[fieldName] = value


        const res = await getReq[reqType](getUrl).send(inputData)

        expect(res.status).toBe(400)

    })
}