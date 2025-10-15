import {body} from "express-validator";
import {VALIDATION_ERR_MSG} from "../../../../common/validator/validation-error-messages";
import {LikeStatus} from "../../common/Like.type";

const fields = ['likeStatus'];
const availableFields = Object.values(LikeStatus)

export const likeForCommentInputValidator = [

    ...fields.map(field => body(field).trim().notEmpty().withMessage(VALIDATION_ERR_MSG.isEmpty)),

    body('likeStatus')
        .isString().withMessage(VALIDATION_ERR_MSG.isString)
        .isIn(availableFields).withMessage(`Should be one of: [${availableFields}]`),


]