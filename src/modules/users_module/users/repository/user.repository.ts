import {userCollection} from "../../../../db/db.mongodb";
import {UserDocumentModel} from "../models/user-document-model";
import {UserInsertModel} from "../models/user-insert-model";
import {ObjectId} from "mongodb";

export const userRepository = {

    async getUserByEmail(email: string): Promise<UserDocumentModel | null> {
        return await userCollection.findOne({email: email});
    },

    async isUserExistByLogin(login: string): Promise<boolean> {
        const result = await userCollection.findOne({login: login});

        return !!result
    },

    async createUser(userDto: UserInsertModel) {
        const result = await userCollection.insertOne(userDto as UserDocumentModel);


        return result.insertedId.toString()
    },

    async isUserExistById(id: string): Promise<boolean> {
        const result = await userCollection.findOne({_id: new ObjectId(id)});

        return !!result
    },

    async deleteUser(id: string): Promise<void> {
        await userCollection.deleteOne({_id: new ObjectId(id)});
    },

    async getUserByEmailConfirmationCode(code: string): Promise<UserDocumentModel | null> {

        return await userCollection.findOne({'confirmationData.confirmationCode': code});

    },

    async getUserByPasswordConfirmationCode(code: string): Promise<UserDocumentModel | null> {

        return  await userCollection.findOne({'passwordRecovery.code': code});




    },

    async setNewPasswordById(userId: string, newPassword: string) {
        return await userCollection.updateOne(
            {_id: new ObjectId(userId)},
            {$set: {password: newPassword}})
    },

    async confirmEmailByConfirmationCode(code: string) {
        return await userCollection.updateOne({'confirmationData.confirmationCode': code}, {$set: {'confirmationData.isConfirmed': true}});
    },

    async setNewConfirmationCodeByEmail(email: string, code: string, date: string) {
        return await userCollection.updateOne(
            {email: email},
            {
                $set: {
                    'confirmationData.confirmationCode': code,
                    'confirmationData.confirmationCodeExpirationDate': date
                }
            });
    },


    async setNewPasswordRecoveryCode(email: string, code: string, date: string) {
        return await userCollection.updateOne(
            {email: email},
            {
                $set: {
                    'passwordRecovery.code': code,
                    'passwordRecovery.expirationDate': date
                }
            });
    },


    async getUserById(id: string): Promise<UserDocumentModel | null> {
        return await userCollection.findOne({_id: new ObjectId(id)});
    },

    async getUserByEmailOrLogin(loginOrEmail: string): Promise<UserDocumentModel | null> {
        return await userCollection.findOne({$or: [{email: loginOrEmail}, {login: loginOrEmail}]})

    }


}