import {UserInputModel} from "../../users_module/users/models/user-input-model";
import {randomUUID} from "node:crypto";

export const createUsersInsertData = (blogCount:number):UserInputModel[] => {
    const inputModelsArr:UserInputModel[] = []
    //create 30 blogs
    for(let i = 0; i < blogCount; i++) {

        const userInsertModel:UserInputModel = {
            login:randomUUID() + "testLogin " + i,
            password: "qwerty",
            email: randomUUID() + `testEmail${i}@gmail.com `,

        }
        inputModelsArr.push(userInsertModel)
    }

    return inputModelsArr
}