import {config} from 'dotenv'
config()

export const SETTINGS = {
    PORT: process.env.APP_PORT || 3000,
    AUTH: {
        BASIC_AUTH_LOGIN: process.env.BASIC_AUTH_LOGIN || 'admin',
        BASIC_AUTH_PASSWORD: process.env.BASIC_AUTH_PASSWORD || 'qwerty'
    },
    USER:{
        EMAIL_CONFIRMATION_CODE_EXPIRATION_TIME: Number(process.env.USER_CONFIRMATION_CODE_EXPIRATION_DATE_TIME) || 10,
        PASSWORD_RECOVERY_CODE_EXPIRATION_TIME: Number(process.env.USER_PASSWORD_RECOVERY_CODE_EXPIRATION_TIME) || 20
    },
    JWT: {
        ACCESS_TOKEN: {
            LIFETIME: Number(process.env.JWT_ACCESS_TOKEN_LIFETIME) ?
                Number(process.env.JWT_ACCESS_TOKEN_LIFETIME) + 'm' : '15m',
            SECRET_KEY: process.env.JWT_ACCESS_TOKEN_SECRET_KEY || '1111'

        },
        REFRESH_TOKEN: {
            LIFETIME: Number(process.env.JWT_REFRESH_TOKEN_LIFETIME) ?
                Number(process.env.JWT_REFRESH_TOKEN_LIFETIME) + 'd' : '7d',
            SECRET_KEY: process.env.JWT_REFRESH_TOKEN_SECRET_KEY || '1212'

        }

    },


    DB: {
        PORT:27017,
        NAME: "Blog",
        URL: 'mongodb://localhost:27017',
    }


}