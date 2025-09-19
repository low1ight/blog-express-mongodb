import {Router} from "express";
import {loginHandler} from "./handlers/loginHandler";
import {validate} from "../../../../common/validator/validationHandler";
import {loginInputValidator} from "../validators/login-input-validator";
import {jwtAuthGuard} from "../guards/jwt.auth.guard";
import {meHandler} from "./handlers/meHandler";


export const authRouter = Router()


authRouter.post('/login', validate(loginInputValidator),loginHandler)
authRouter.get('/me', jwtAuthGuard, meHandler)