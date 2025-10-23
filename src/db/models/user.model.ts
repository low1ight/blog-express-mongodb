import mongoose from "mongoose";
import {UserDocumentModel} from "../../modules/users_module/users/models/user-document-model";

const USER_COLLECTION_NAME = 'users';

export const userSchema = new mongoose.Schema<UserDocumentModel>({
    login:{type: String, required: true},
    password:{type: String, required: true},
    email:{type: String, required: true},
    confirmationData:{
        isConfirmed: {type: Boolean, required: true},
        confirmationCode:{type: String, required: true},
        confirmationCodeExpirationDate:{type: String, required: true}
    },
    passwordRecovery: {
        code:{type: String, default: null},
        expirationDate:{type: String, default: null}
    },
}, {timestamps: true})



export const User = mongoose.model<UserDocumentModel>(USER_COLLECTION_NAME, userSchema);