import {config} from 'dotenv'
config()
export const SETTINGS = {
    PORT: process.env.APP_PORT || 3000,
    AUTH: {
        BASIC_AUTH_LOGIN: process.env.BASIC_AUTH_LOGIN || 'admin',
        BASIC_AUTH_PASSWORD: process.env.BASIC_AUTH_PASSWORD || 'qwerty'
    },
    USER:{
        CONFIRMATION_CODE_EXPIRATION_DATE_TIME: Number(process.env.USER_CONFIRMATION_CODE_EXPIRATION_DATE_TIME) ?
            Number(process.env.USER_CONFIRMATION_CODE_EXPIRATION_DATE_TIME) : 5
    },

    DB: {
        PORT:27017,
        NAME: "Blog",
        URL: 'mongodb://localhost:27017',
    }


}