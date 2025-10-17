import {body} from "express-validator";
import {VALIDATION_ERR_MSG} from "../../../../common/validator/validation-error-messages";
import {LikeStatus, likeTypesArr} from "../../common/Like.type";

const fields = ['likeStatus'];


export const likeForCommentInputValidator = [

    ...fields.map(field => body(field).trim().notEmpty().withMessage(VALIDATION_ERR_MSG.isEmpty)),

    body('likeStatus')
        .isString().withMessage(VALIDATION_ERR_MSG.isString)
        .isIn(likeTypesArr).withMessage(`Should be one of: [${likeTypesArr}]`),


]