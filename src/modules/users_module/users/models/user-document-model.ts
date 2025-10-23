import {ObjectId} from "mongodb";

export type UserDocumentModel = {
    _id :ObjectId
    login:string,
    password:string,
    email:string,
    createdAt:string
    updatedAt:string
    confirmationData:{
        isConfirmed: boolean,
        confirmationCode:string
        confirmationCodeExpirationDate:string
    }
    passwordRecovery: {
        code:string | null
        expirationDate:string | null
    }
}
