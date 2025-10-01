export type JwtRefreshTokenPayloadModel = {
    userId: string,
    deviceId:string,
    deviceSessionCode:string
    iat: number,
    exp: number
}