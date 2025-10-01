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
import {EmailCodeResendingInputModel} from "../models/emailCodeResending-input-model";
import {devicesService} from "../../devices/application/devices.service";
import {DeviceDocumentModel} from "../../devices/models/device-document-model";


export const authService = {

    async registration({login, email, password}: UserInputModel) {

        const isEmailExist = await userRepository.getUserByEmail(email)

        if (isEmailExist) {
            return new CustomResponse(false, CustomResponseEnum.INVALID_INPUT_DATA, 'This email already exist')
        }

        const isLoginExist = await userRepository.isUserExistByLogin(login)

        if (isLoginExist) {
            return new CustomResponse(false, CustomResponseEnum.INVALID_INPUT_DATA, 'This login already exist')
        }

        const hashedPassword = await passwordHelper.hashPassword(password)
        const confirmationCode: string = randomUUID()


        const userInsertModel: UserInsertModel = {
            login,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            confirmationData: {
                isConfirmed: false,
                confirmationCode: confirmationCode,
                confirmationCodeExpirationDate: expirationDateHelper.createExpirationDate()
            }

        }

        const result = await userRepository.createUser(userInsertModel)
        if (result) {
            await emailManager.sendRegistrationCode(email, confirmationCode)
        }

        return new CustomResponse(true, null, 'successful create user')


    },

    async emailCodeResending({email}: EmailCodeResendingInputModel) {


        const user = await userRepository.getUserByEmail(email)

        if (!user) {
            return new CustomResponse(false, CustomResponseEnum.INVALID_INPUT_DATA, 'Incorrect email')
        }


        if (user.confirmationData.isConfirmed) {
            return new CustomResponse(false, CustomResponseEnum.INVALID_INPUT_DATA, 'Email has already confirmed')
        }

        const expirationDate: string = expirationDateHelper.createExpirationDate()
        const confirmationCode: string = randomUUID()

        await userRepository.setNewConfirmationCodeByEmail(email, confirmationCode, expirationDate)

        await emailManager.sendRegistrationCode(email, confirmationCode)


        return new CustomResponse(true, null, 'successful sent')


    },

    async emailConfirmation(code: string) {

        const user = await userRepository.getUserByConfirmationCode(code)

        if (!user) {
            return new CustomResponse(false, CustomResponseEnum.INVALID_INPUT_DATA, 'confirmation code is incorrect')
        }

        if (user.confirmationData.isConfirmed) {
            return new CustomResponse(false, CustomResponseEnum.INVALID_INPUT_DATA, 'the email is already confirmed')
        }

        if (expirationDateHelper.isDateExpired(user.confirmationData.confirmationCodeExpirationDate)) {
            return new CustomResponse(false, CustomResponseEnum.INVALID_INPUT_DATA, 'confirmation code is expired')
        }

        await userRepository.confirmEmailByConfirmationCode(code)

        return new CustomResponse(true, null, 'email successfully confirmed')


    },


    async refreshToken(refreshToken: string) {

        const refreshTokenPayload = jwtService.verifyRefreshToken(refreshToken)

        if(!refreshTokenPayload) return null

        const {userId,deviceId,deviceSessionCode} = refreshTokenPayload

        //get device for this session

        const device: DeviceDocumentModel | null = await devicesService.getDeviceById(deviceId)

        if(!device) return null

        if(device.sessionCode !== deviceSessionCode) return null

        //update device and refresh token returns new couple of tokens

        const newSessionCode = randomUUID()

        await devicesService.updateDeviceSessionCode(deviceId, newSessionCode)

        return  jwtService.sign(userId,deviceId,newSessionCode)


    },



    async login({loginOrEmail, password}: LoginInputModel, ip:string) {


        const user = await userRepository.getUserByEmailOrLogin(loginOrEmail)

        if (!user) return null

        const result = await passwordHelper.comparePassword(password, user.password)

        if (!result) return null

        const sessionCode = randomUUID()

        const deviceId = await devicesService.createDevice(ip, sessionCode)

        return jwtService.sign(user._id.toString(), deviceId, sessionCode)


    },


    async me(userId: string) {

        const user = await userRepository.getUserById(userId)

        if (!user) return null

        return toMeViewModel(user)
    }


}