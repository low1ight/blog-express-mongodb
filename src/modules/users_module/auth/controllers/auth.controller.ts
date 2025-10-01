import {Router} from "express";
import {loginHandler} from "./handlers/loginHandler";
import {validate} from "../../../../common/validator/validationHandler";
import {loginInputValidator} from "../validators/login-input-validator";
import {jwtAuthGuard} from "../guards/jwt.auth.guard";
import {meHandler} from "./handlers/meHandler";
import {registrationHandler} from "./handlers/registrationHandler";
import {userInputValidator} from "../../users/validators/create-users-input-validator";
import {emailConfirmationInputValidator} from "../validators/emailConfirmation-input-validator";
import {emailConfirmationHandler} from "./handlers/emailConfirmationHandler";
import {emailRegistrationCodeResendingHandler} from "./handlers/emailRegistrationCodeResendingHandler";
import {emailCodeResendingInputValidator} from "../validators/emailCodeResending-input-validator";
import {refreshTokenHandler} from "./handlers/refreshTokenHandler";


export const authRouter = Router()


authRouter.post('/login', validate(loginInputValidator),loginHandler)
authRouter.post('/refresh-token', refreshTokenHandler)
authRouter.get('/me', jwtAuthGuard, meHandler)
authRouter.post('/registration', validate(userInputValidator), registrationHandler)
authRouter.post('/registration-confirmation',validate(emailConfirmationInputValidator), emailConfirmationHandler)
authRouter.post('/registration-email-resending',validate(emailCodeResendingInputValidator), emailRegistrationCodeResendingHandler)