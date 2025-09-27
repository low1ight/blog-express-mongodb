import {body} from "express-validator";
import {VALIDATION_ERR_MSG} from "../../../../common/validator/validation-error-messages";

const fields = ['code'];

export const emailConfirmationInputValidator = [

    ...fields.map(field => body(field).trim().notEmpty().withMessage(VALIDATION_ERR_MSG.isEmpty)),


]