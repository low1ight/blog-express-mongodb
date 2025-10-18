
import {VALIDATION_ERR_MSG} from "../../../../common/validator/validation-error-messages";
import {likeTypesArr} from "../../common/Like.type";
import {body} from "express-validator";

const fields = ['likeStatus'];


export const likeForPostInputValidator = [

    ...fields.map(field => body(field).trim().notEmpty().withMessage(VALIDATION_ERR_MSG.isEmpty)),

    body('likeStatus')
        .isString().withMessage(VALIDATION_ERR_MSG.isString)
        .isIn(likeTypesArr).withMessage(`Should be one of: [${likeTypesArr}]`),


]