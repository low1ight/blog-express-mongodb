export const toHttpCode = (customResponseErrCode:any):number => {
    const httpCode: Record<any, number> = {
        1:400,
        2:404,
        3:401,
        4:403,
    }


    return httpCode[customResponseErrCode]

}