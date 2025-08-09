import {UserInputModel} from "../models/user-input-model";
import {userRepository} from "../repository/user.repository";
import {UserInsertModel} from "../models/user-insert-model";

export const userService = {

    async createUser({login,email,password}:UserInputModel):Promise<string | null>   {

        const isEmailExist = await userRepository.isEmailExist(email)

        if(isEmailExist) {
            return null
        }

        const userInsertModel:UserInsertModel = {
            login,
            email,
            password,
            createdAt: new Date().toISOString()

        }

        return await userRepository.createUser(userInsertModel)

    }


}