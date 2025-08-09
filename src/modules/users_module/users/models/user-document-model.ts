import {ObjectId} from "mongodb";

export type UserDocumentModel = {
    _id :ObjectId
    login:string,
    password:string,
    email:string,
    createdAt:string
}
