import {body} from "express-validator";
import {VALIDATION_ERR_MSG} from "../../../../common/validator/validation-error-messages";

const fields = ['login', 'password', 'email'];

export const userInputValidator = [

    ...fields.map(field => body(field).trim().notEmpty().withMessage(VALIDATION_ERR_MSG.isEmpty)),


    body('login')
        .isString().withMessage(VALIDATION_ERR_MSG.isString)
        .isLength({min: 3, max: 10}).withMessage(VALIDATION_ERR_MSG.lengthMinMax(3, 10)),


    body('password')
        .isString().isLength({min: 6, max: 20}).withMessage(VALIDATION_ERR_MSG.lengthMinMax(6, 20)),


    body('email')
        .isLength({min: 5, max: 50}).withMessage(VALIDATION_ERR_MSG.lengthMinMax(5, 50))
        .isEmail().withMessage(VALIDATION_ERR_MSG.isEmail),

]