import {SETTINGS} from "../../../../settings";

export const expirationDateHelper = {

    createExpirationDate() {
        return new Date(new Date().getTime() + SETTINGS.USER.CONFIRMATION_CODE_EXPIRATION_DATE_TIME * 60000).toISOString();
    },

    isDateExpired(isoDate:string) {
        return isoDate < new Date().toISOString();

    }


}