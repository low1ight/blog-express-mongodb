import {
    blogCollection,
    commentCollection,
    devicesCollection, likeForCommentCollection, likeForPostCollection,
    postCollection,
    userCollection
} from "../../../db/mongodb";


export const testingRepository = {


    async deleteAllData() {
        await blogCollection.deleteMany({});
        await postCollection.deleteMany({});
        await userCollection.deleteMany({});
        await commentCollection.deleteMany({});
        await devicesCollection.deleteMany({});
        await likeForCommentCollection.deleteMany({});
        await likeForPostCollection.deleteMany({});

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