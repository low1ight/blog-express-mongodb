import {ObjectId} from "mongodb";

export type UserDocumentModel = {
    _id :ObjectId
    login:string,
    password:string,
    email:string,
    createdAt:string
    confirmationData:{
        isConfirmed: boolean,
        confirmationCode:string
        confirmationCodeExpirationDate:string
    }
}
