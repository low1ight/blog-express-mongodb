import jwt from "jsonwebtoken";
import {UserPayloadModel} from "../models/user-payload-model";
import {JwtAccessTokenPayloadModel} from "../models/jwt-access-token-payload-model";
import {SETTINGS} from "../../../../settings";
import {Tokens} from "../models/Tokens";

export const jwtService = {

    sign(userId: string, deviceId:string,deviceSessionCode:string,):Tokens {
        const accessToken = jwt.sign(
            {id: userId},
            SETTINGS.JWT.ACCESS_TOKEN.SECRET_KEY,
            {expiresIn: SETTINGS.JWT.ACCESS_TOKEN.LIFETIME as jwt.SignOptions['expiresIn']}
        );

        const refreshToken = jwt.sign(
            {id: userId, deviceId, deviceSessionCode},
            SETTINGS.JWT.REFRESH_TOKEN.SECRET_KEY,
            {expiresIn: SETTINGS.JWT.REFRESH_TOKEN.LIFETIME as jwt.SignOptions['expiresIn']}
        );

        return [accessToken, refreshToken];

    },


    verifyAccessToken(token: string): UserPayloadModel | null {
        let payload
        try {
            payload = jwt.verify(token, SETTINGS.JWT.ACCESS_TOKEN.SECRET_KEY) as JwtAccessTokenPayloadModel;
            return {id: payload.id};

        } catch (err) {
            return null
        }


    }

}