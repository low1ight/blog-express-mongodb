import {body} from "express-validator";
import {VALIDATION_ERR_MSG} from "../../../../common/validator/validation-error-messages";

const fields = ['name', 'description', 'websiteUrl'];

export const blogInputValidator = [

    ...fields.map(field => body(field).trim().notEmpty().withMessage(VALIDATION_ERR_MSG.isEmpty)),


    body('name')
        .isString().withMessage(VALIDATION_ERR_MSG.isString)
        .isLength({min: 3, max: 15}).withMessage(VALIDATION_ERR_MSG.lengthMinMax(3, 15)),


    body('description')
        .isString().isLength({min: 3, max: 500}).withMessage(VALIDATION_ERR_MSG.lengthMinMax(3, 500)),


    body('websiteUrl')
        .isLength({min: 3, max: 100}).withMessage(VALIDATION_ERR_MSG.lengthMinMax(3, 100))
        .isURL().withMessage(VALIDATION_ERR_MSG.isURL),

]