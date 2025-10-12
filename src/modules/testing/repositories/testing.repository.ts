import {
    blogCollection,
    commentCollection,
    devicesCollection,
    postCollection,
    userCollection
} from "../../../db/db.mongodb";


export const testingRepository = {


    async deleteAllData() {
        await blogCollection.deleteMany({});
        await postCollection.deleteMany({});
        await userCollection.deleteMany({});
        await commentCollection.deleteMany({});
        await devicesCollection.deleteMany({});

    },


    async getUserEmailConfirmationCodeByEmail(email:string):Promise<string> {
        const user =  await userCollection.findOne({email});
        return user?.confirmationData?.confirmationCode || ""


    },

    async getUserPasswordRecoveryCodeByEmail(email:string):Promise<string> {
        const user =  await userCollection.findOne({email});
        return user?.passwordRecovery?.code || ""


    }



}