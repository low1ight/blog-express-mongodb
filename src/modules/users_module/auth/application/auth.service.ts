import {LoginInputModel} from "../models/login-input-model";
import {userRepository} from "../../users/repository/user.repository";
import {passwordHelper} from "../../users/features/passwordHelper";
import {jwtService} from "./jwt.service";


export const authService = {

    async login({loginOrEmail, password}: LoginInputModel) {


      const user = await userRepository.getUserByEmailOrLogin(loginOrEmail)

      if(!user) return null


      const result = await passwordHelper.comparePassword(password, user.password)

      if(!result) return null


      return jwtService.sign(user._id.toString())




    }



}