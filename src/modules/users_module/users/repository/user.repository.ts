import {UserDocumentModel} from "../models/user-document-model";
import {UserInsertModel} from "../models/user-insert-model";
import {User} from "../../../../db/models/user.model";

export const userRepository = {

    async getUserByEmail(email: string): Promise<UserDocumentModel | null> {
        return User.findOne({email: email}).lean();
    },

    async isUserExistByLogin(login: string): Promise<boolean> {
        const result = await User.findOne({login: login});

        return !!result
    },

    async createUser(createUserDto: UserInsertModel) {
        const result: UserDocumentModel = await User.create(createUserDto);

        return result._id.toString()
    },

    async isUserExistById(id: string): Promise<boolean> {
        const result = await User.findOne({_id: id});

        return !!result
    },

    async deleteUser(id: string): Promise<void> {
        await User.deleteOne({_id: id});
    },

    async getUserByEmailConfirmationCode(code: string): Promise<UserDocumentModel | null> {
        return User.findOne({'confirmationData.confirmationCode': code});
    },

    async getUserByPasswordRecoveryCode(code: string): Promise<UserDocumentModel | null> {
        return User.findOne({'passwordRecovery.code': code});
    },

    async setNewPasswordById(userId: string, newPassword: string) {
        return User.updateOne(
            {_id: userId},
            {$set: {password: newPassword}})
    },

    async confirmEmailByConfirmationCode(code: string) {
        return User.updateOne(
            {'confirmationData.confirmationCode': code},
            {$set: {'confirmationData.isConfirmed': true}});
    },

    async setNewConfirmationCodeByEmail(email: string, code: string, date: string) {
        return User.updateOne(
            {email: email},
            {
                $set: {
                    'confirmationData.confirmationCode': code,
                    'confirmationData.confirmationCodeExpirationDate': date
                }
            });
    },


    async setNewPasswordRecoveryCode(email: string, code: string, date: string) {
        return User.updateOne(
            {email: email},
            {
                $set: {
                    'passwordRecovery.code': code,
                    'passwordRecovery.expirationDate': date
                }
            });
    },


    async expirePasswordRecoveryCode(userId: string) {
        return User.updateOne(
            {_id: userId},
            {
                $set: {
                    'passwordRecovery.code': null,
                    'passwordRecovery.expirationDate': null
                }
            });
    },


    async getUserById(id: string): Promise<UserDocumentModel | null> {
        return  User.findOne({_id: id});
    },

    async getUserByEmailOrLogin(loginOrEmail: string): Promise<UserDocumentModel | null> {
        return User.findOne({$or: [{email: loginOrEmail}, {login: loginOrEmail}]})

    }


}