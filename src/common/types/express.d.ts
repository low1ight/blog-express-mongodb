import {JwtAccessTokenPayloadModel} from "../../modules/users_module/auth/models/jwt-access-token-payload-model";
import {JwtRefreshTokenPayloadModel} from "../../modules/users_module/auth/models/jwt-refresh-token-payload-model";

declare global {
    namespace Express {
        export interface Request {
            user: JwtAccessTokenPayloadModel | JwtRefreshTokenPayloadModel;
        }
    }
}