export const toHttpCode = (customResponseErrCode:any):number => {
    const httpCode: Record<any, number> = {
        1:400,
        2:404
    }


    return httpCode[customResponseErrCode]

}