import {UserInputModel} from "../../users_module/users/models/user-input-model";
import {randomUUID} from "node:crypto";

export const createUsersInsertData = (count:number):UserInputModel[] => {
    const inputModelsArr:UserInputModel[] = []
    for(let i = 0; i < count; i++) {

        const userInsertModel:UserInputModel = {
            login:"userLogin:" + i + ' ' + randomUUID() ,
            password: "qwerty",
            email: randomUUID() + `testEmail${i}@gmail.com `,

        }
        inputModelsArr.push(userInsertModel)
    }

    return inputModelsArr
}