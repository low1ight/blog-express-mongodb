import {emailAdapter} from "../adapters/email.adapter";

export const emailManager = {

    async sendRegistrationCode(email:string,code:string) {

        await emailAdapter.sendEmail(
            email,
            'Please Confirm Your Account',
            `<h1>Enter the following code: ${code}</h1>`



        )

    }


}