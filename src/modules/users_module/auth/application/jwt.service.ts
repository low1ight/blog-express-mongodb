import jwt from "jsonwebtoken";
import {JwtAccessTokenPayloadModel} from "../models/jwt-access-token-payload-model";
import {SETTINGS} from "../../../../settings";
import {Tokens} from "../models/Tokens";
import {JwtRefreshTokenPayloadModel} from "../models/jwt-refresh-token-payload-model";

export const jwtService = {

    sign(userId: string, deviceId:string,deviceSessionCode:string,):Tokens {
        const accessToken = jwt.sign(
            {userId},
            SETTINGS.JWT.ACCESS_TOKEN.SECRET_KEY,
            {expiresIn: SETTINGS.JWT.ACCESS_TOKEN.LIFETIME as jwt.SignOptions['expiresIn']}
        );

        const refreshToken = jwt.sign(
            {userId, deviceId, deviceSessionCode},
            SETTINGS.JWT.REFRESH_TOKEN.SECRET_KEY,
            {expiresIn: SETTINGS.JWT.REFRESH_TOKEN.LIFETIME as jwt.SignOptions['expiresIn']}
        );

        return [accessToken, refreshToken];

    },


    verifyAccessToken(token: string): JwtAccessTokenPayloadModel | null {
        try {
            return  jwt.verify(token, SETTINGS.JWT.ACCESS_TOKEN.SECRET_KEY) as JwtAccessTokenPayloadModel;

        } catch (err) {
            return null
        }


    },


    verifyRefreshToken(token: string): JwtRefreshTokenPayloadModel | null {

        try {
            return jwt.verify(token, SETTINGS.JWT.REFRESH_TOKEN.SECRET_KEY) as JwtRefreshTokenPayloadModel;

        } catch (err) {
            return null
        }


    }

}