export type JwtRefreshTokenPayloadModel = {
    id: string,
    sessionId:string,
    sessionCode:string
    iat: number,
    exp: number
}