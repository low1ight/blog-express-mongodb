import {UserInputModel} from "../models/user-input-model";
import {userRepository} from "../repository/user.repository";
import {UserInsertModel} from "../models/user-insert-model";
import {passwordHelper} from "../features/passwordHelper";
import {ObjectId} from "mongodb";
import {CustomResponse} from "../../../../utils/customResponse/customResponse";
import {CustomResponseEnum} from "../../../../utils/customResponse/customResponseEnum";

export const userService = {

    async createUser({login,email,password}:UserInputModel):Promise<CustomResponse<string>>   {

        const isEmailExist = await userRepository.getUserByEmail(email)

        if(isEmailExist) {
            return new CustomResponse(false,CustomResponseEnum.INVALID_INPUT_DATA, 'This email already exist')
        }

        const isLoginExist = await userRepository.isUserExistByLogin(login)

        if(isLoginExist) {
            return new CustomResponse(false,CustomResponseEnum.INVALID_INPUT_DATA, 'This login already exist')
        }

        const hashedPassword = await passwordHelper.hashPassword(password)

        const userInsertModel:UserInsertModel = {
            login,
            email,
            password: hashedPassword,
            confirmationData:{
                isConfirmed: true,
                confirmationCode:'createdByAdmin',
                confirmationCodeExpirationDate:new Date().toISOString()
            },
            passwordRecovery: {
                code:'',
                expirationDate:new Date().toISOString()
            }

        }

        const result = await userRepository.createUser(userInsertModel)
        return new CustomResponse(true,null,result)

    },


    async deleteUser(id:string):Promise<boolean> {

        if(!ObjectId.isValid(id)) return false

        const isUserExist = await userRepository.isUserExistById(id)

        if(!isUserExist) return false

        await userRepository.deleteUser(id)
        return true

    }


}