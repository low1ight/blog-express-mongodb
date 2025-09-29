import {body} from "express-validator";
import {VALIDATION_ERR_MSG} from "../../../../common/validator/validation-error-messages";

const fields = ['email'];

export const emailCodeResendingInputValidator = [

    ...fields.map(field => body(field).trim().notEmpty().withMessage(VALIDATION_ERR_MSG.isEmpty)),


    body('email').isEmail().withMessage(VALIDATION_ERR_MSG.isEmail),


]