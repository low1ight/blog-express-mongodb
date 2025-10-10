import {SETTINGS} from "../../../../settings";

export const expirationDateHelper = {

    createEmailConfirmationExpirationDate() {
        return new Date(new Date().getTime() + SETTINGS.USER.EMAIL_CONFIRMATION_CODE_EXPIRATION_TIME * 60000).toISOString();
    },

    createPasswordRecoveryExpirationDate() {
        return new Date(new Date().getTime() + SETTINGS.USER.PASSWORD_RECOVERY_CODE_EXPIRATION_TIME * 60000).toISOString();
    },

    isDateExpired(isoDate:string) {
        return isoDate < new Date().toISOString();

    }


}