import {Router} from "express";
import {loginHandler} from "./handlers/loginHandler";
import {validate} from "../../../../common/validator/validationHandler";
import {loginInputValidator} from "../validators/login-input-validator";


export const authRouter = Router()


authRouter.post('/login', validate(loginInputValidator),loginHandler)