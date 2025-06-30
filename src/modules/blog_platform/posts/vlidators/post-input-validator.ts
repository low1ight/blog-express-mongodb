import {body} from "express-validator";
import {VALIDATION_ERR_MSG} from "../../../../common/validator/validation-error-messages";

const fields = [ 'title', 'shortDescription', 'content']



export const postForBlogInputValidator = [

    ...fields.map((i:string)=> body(i).trim().notEmpty().withMessage(VALIDATION_ERR_MSG.isEmpty)),

    body('title')
        .isLength({min:3,max:30}).withMessage(VALIDATION_ERR_MSG.lengthMinMax(3,30)),


    body('shortDescription')
        .isLength({min:3,max:30}).withMessage(VALIDATION_ERR_MSG.lengthMinMax(3,100)),


    body('content')
        .isLength({min:3,max:30}).withMessage(VALIDATION_ERR_MSG.lengthMinMax(3,1000)),





]


export const postInputValidator = [

    ...postForBlogInputValidator,


    body('blogId')
        .trim().notEmpty().withMessage(VALIDATION_ERR_MSG.isEmpty)
        .isMongoId(),


]




