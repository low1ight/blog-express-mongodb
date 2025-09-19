import {LoginInputModel} from "../models/login-input-model";
import {userRepository} from "../../users/repository/user.repository";
import {passwordHelper} from "../../users/features/passwordHelper";
import {jwtService} from "./jwt.service";
import {toMeViewModel} from "../features/toMeViewModel";


export const authService = {

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