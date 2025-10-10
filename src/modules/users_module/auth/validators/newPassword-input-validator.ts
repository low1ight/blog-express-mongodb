import {body} from "express-validator";
import {VALIDATION_ERR_MSG} from "../../../../common/validator/validation-error-messages";

const fields = ['newPassword', 'recoveryCode', ];

export const newPasswordInputValidator = [

    ...fields.map(field => body(field).trim().notEmpty().withMessage(VALIDATION_ERR_MSG.isEmpty)),


    body('newPassword')
        .isString().withMessage(VALIDATION_ERR_MSG.isString)
        .isLength({min: 6, max: 20}).withMessage(VALIDATION_ERR_MSG.lengthMinMax(6, 20)),


]