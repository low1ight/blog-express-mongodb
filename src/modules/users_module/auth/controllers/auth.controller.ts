import {Router} from "express";
import {loginHandler} from "./handlers/loginHandler";
import {validate} from "../../../../common/validator/validationHandler";
import {loginInputValidator} from "../validators/login-input-validator";
import {jwtAccessTokenAuthGuard} from "../guards/jwtAccessToken.auth.guard";
import {meHandler} from "./handlers/meHandler";
import {registrationHandler} from "./handlers/registrationHandler";
import {userInputValidator} from "../../users/validators/create-users-input-validator";
import {emailConfirmationInputValidator} from "../validators/emailConfirmation-input-validator";
import {emailConfirmationHandler} from "./handlers/emailConfirmationHandler";
import {emailRegistrationCodeResendingHandler} from "./handlers/emailRegistrationCodeResendingHandler";
import {emailCodeResendingInputValidator} from "../validators/emailCodeResending-input-validator";
import {refreshTokenHandler} from "./handlers/refreshTokenHandler";
import {passwordRecoveryInputValidator} from "../validators/password-recovery-input-validator";
import {passwordRecoveryHandler} from "./handlers/passwordRecoveryHandler";
import {newPasswordInputValidator} from "../validators/newPassword-input-validator";
import {newPasswordHandler} from "./handlers/newPasswordHandler";
import {jwtRefreshTokenAuthGuard} from "../guards/jwtRefreshToken.auth.guard";
import {logoutHandler} from "./handlers/logoutHandler";


export const authRouter = Router()


authRouter.post('/login', validate(loginInputValidator),loginHandler)
authRouter.post('/logout', jwtRefreshTokenAuthGuard, logoutHandler)
authRouter.post('/refresh-token',jwtRefreshTokenAuthGuard, refreshTokenHandler)
authRouter.get('/me', jwtAccessTokenAuthGuard, meHandler)
authRouter.post('/new-password', validate(newPasswordInputValidator) , newPasswordHandler)
authRouter.post('/registration', validate(userInputValidator), registrationHandler)
authRouter.post('/password-recovery', validate(passwordRecoveryInputValidator), passwordRecoveryHandler)
authRouter.post('/registration-confirmation',validate(emailConfirmationInputValidator), emailConfirmationHandler)
authRouter.post('/registration-email-resending',validate(emailCodeResendingInputValidator), emailRegistrationCodeResendingHandler)