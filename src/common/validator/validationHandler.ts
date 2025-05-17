import {Request,Response,NextFunction} from "express";
import {ValidationChain, ValidationError, validationResult} from "express-validator";


export const validate = (...validationsArr: ValidationChain[][]) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        let validations:ValidationChain[] = []
        //concat all validators arr
        validationsArr.forEach((i:ValidationChain[]) => {
            validations = validations.concat(i)
        } )


        for (const validation of validations) {
            await validation.run(req);
        }


        const result= validationResult(req);
        if (!result.isEmpty()) {
           const validationErrors: ValidationError[] = result.array({onlyFirstError: true})

            console.log(validationErrors)





            const mappedErrors = {
                errors: validationErrors.map((i:CustomValidationError) => ({message: i.msg, fields: i.path || i.location}))

            }

            if(mappedErrors.errors[0].fields === 'id'){
                res.sendStatus(404)
            } else {
                res.status(400).send(mappedErrors)
            }




            return
        }

        next();
    };
};

type CustomValidationError = ValidationError & {
    path?: string
    location?:string
}
