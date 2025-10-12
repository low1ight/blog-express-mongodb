import {JwtRefreshTokenPayloadModel} from "../../src/modules/users_module/auth/models/jwt-refresh-token-payload-model";


export const jwtHelper = {


    getRefreshTokenPayload(jwt:string):JwtRefreshTokenPayloadModel {

        const start = jwt.indexOf('.') + 1
        const end = jwt.lastIndexOf('.')

        const result = atob(jwt.slice(start, end))

        return JSON.parse(result)


    }

}