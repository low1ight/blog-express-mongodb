import {UserInputModel} from "../models/user-input-model";
import {userRepository} from "../repository/user.repository";
import {UserInsertModel} from "../models/user-insert-model";
import {passwordHelper} from "../features/passwordHelper";

export const userService = {

    async createUser({login,email,password}:UserInputModel):Promise<string | null>   {

        const isEmailExist = await userRepository.isEmailExist(email)

        if(isEmailExist) {
            return null
        }

        const hashedPassword = await passwordHelper.hashPassword(password)

        const userInsertModel:UserInsertModel = {
            login,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString()

        }

        return await userRepository.createUser(userInsertModel)

    }


}