import {LoginInputModel} from "../models/login-input-model";
import {userRepository} from "../../users/repository/user.repository";
import {passwordHelper} from "../../users/features/passwordHelper";
import {jwtService} from "./jwt.service";
import {toMeViewModel} from "../features/toMeViewModel";
import {UserInputModel} from "../../users/models/user-input-model";
import {CustomResponse} from "../../../../utils/customResponse/customResponse";
import {CustomResponseEnum} from "../../../../utils/customResponse/customResponseEnum";
import {UserInsertModel} from "../../users/models/user-insert-model";
import {randomUUID} from "node:crypto";
import {emailManager} from "./email.manager";
import {expirationDateHelper} from "../features/expirationDateHelper";


export const authService = {

    async registration({login,email,password}:UserInputModel) {

        const isEmailExist = await userRepository.isUserExistByEmail(email)

        if(isEmailExist) {
            return new CustomResponse(false,CustomResponseEnum.INVALID_INPUT_DATA, 'This email already exist')
        }

        const isLoginExist = await userRepository.isUserExistByLogin(login)

        if(isLoginExist) {
            return new CustomResponse(false,CustomResponseEnum.INVALID_INPUT_DATA, 'This login already exist')
        }

        const hashedPassword = await passwordHelper.hashPassword(password)
        const confirmationCode:string = randomUUID()



        const userInsertModel:UserInsertModel = {
            login,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            confirmationData:{
                isConfirmed: false,
                confirmationCode: confirmationCode,
                confirmationCodeExpirationDate: expirationDateHelper.createExpirationDate()
            }

        }

        const result = await userRepository.createUser(userInsertModel)
        if(result) {
            await emailManager.sendRegistrationCode(email,confirmationCode)
        }

         return new CustomResponse(true, null, 'successful create user')




    },

    async emailConfirmation(code:string){

        const user = await userRepository.getUserByConfirmationCode(code)

        if(!user) {
            return new CustomResponse(false,CustomResponseEnum.INVALID_INPUT_DATA, 'confirmation code is incorrect')
        }

        if(user.confirmationData.isConfirmed) {
            return new CustomResponse(false,CustomResponseEnum.INVALID_INPUT_DATA, 'the email is already confirmed')
        }

        if(expirationDateHelper.isDateExpired(user.confirmationData.confirmationCodeExpirationDate)) {
            return new CustomResponse(false,CustomResponseEnum.INVALID_INPUT_DATA, 'confirmation code is expired')
        }

        await userRepository.confirmEmailByConfirmationCode(code)

        return new CustomResponse(true, null, 'email successfully confirmed')


    },




    async login({loginOrEmail, password}: LoginInputModel) {


      const user = await userRepository.getUserByEmailOrLogin(loginOrEmail)

      if(!user) return null


      const result = await passwordHelper.comparePassword(password, user.password)

      if(!result) return null


      return jwtService.sign(user._id.toString())


    },


    async me(userId:string) {

        const user = await userRepository.getUserById(userId)

        if(!user) return null

        return toMeViewModel(user)
    }



}