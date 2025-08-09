

export const VALIDATION_ERR_MSG = {
    isEmpty: 'The fields cannot be empty!',
    isString: 'The fields must be a string type!',
    isURL: 'Invalid URL!',
    isUUID: 'Invalid id format',
    isBlogExist: 'Blog with this id dont exist',
    isEmail: 'Invalid email format',

    lengthMinMax: (min:number,max:number) => `The field must be at least ${min} symbol, and not longer than ${max}!`,
}