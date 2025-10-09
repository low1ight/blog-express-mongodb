import {body} from "express-validator";
import {VALIDATION_ERR_MSG} from "../../../../common/validator/validation-error-messages";

const fields = ['email'];

export const passwordRecoveryInputValidator = [

    ...fields.map(field => body(field).trim().notEmpty().withMessage(VALIDATION_ERR_MSG.isEmpty)),

    body('email')
        .isLength({min: 5, max: 50}).withMessage(VALIDATION_ERR_MSG.lengthMinMax(5, 50))
        .isEmail().withMessage(VALIDATION_ERR_MSG.isEmail),

]