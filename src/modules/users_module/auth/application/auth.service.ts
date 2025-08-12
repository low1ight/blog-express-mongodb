import {LoginInputModel} from "../models/login-input-model";
import {userRepository} from "../../users/repository/user.repository";
import {passwordHelper} from "../../users/features/passwordHelper";


export const authService = {

    async login({loginOrEmail, password}: LoginInputModel) {


      const user = await userRepository.getUserByEmailOrLogin(loginOrEmail)

      if(!user){
          return false
      }

      return await passwordHelper.comparePassword(password, user.password)


    }



}