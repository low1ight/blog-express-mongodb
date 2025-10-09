import {emailAdapter} from "../adapters/email.adapter";

export const emailManager = {

     sendRegistrationCode(email:string,code:string) {

         emailAdapter.sendEmail(
            email,
            'Please Confirm Your Account',
            `<h1>Enter the following code: ${code}</h1>`



        ).then()

    },



     sendPasswordRecoveryCode(email:string,code:string) {

          emailAdapter.sendEmail(
            email,
            'Password Recovery',
            `<h1>Enter the following code: ${code}</h1>`



        ).then()

    }


}