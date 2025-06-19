export const toHttpCode = (customResponseErrCode:any):number => {
    const httpCode: Record<any, number> = {
        1:404,
        2:400
    }


    return httpCode[customResponseErrCode]

}