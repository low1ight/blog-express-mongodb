import {body} from "express-validator";
import {VALIDATION_ERR_MSG} from "../../../../common/validator/validation-error-messages";

const fields = ['content'];

export const commentInputValidator = [

    ...fields.map(field => body(field).trim().notEmpty().withMessage(VALIDATION_ERR_MSG.isEmpty)),

    body('content')
        .isString().withMessage(VALIDATION_ERR_MSG.isString)
        .isLength({min: 20, max: 300}).withMessage(VALIDATION_ERR_MSG.lengthMinMax(20, 300)),


]