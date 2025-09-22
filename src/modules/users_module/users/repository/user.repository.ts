import {userCollection} from "../../../../db/db.mongodb";
import {UserDocumentModel} from "../models/user-document-model";
import {UserInsertModel} from "../models/user-insert-model";
import {ObjectId} from "mongodb";

export const userRepository = {

    async isUserExistByEmail(email:string):Promise<boolean> {
        const result = await userCollection.findOne({email:email});

        return !!result
    },

    async isUserExistByLogin(login:string):Promise<boolean> {
        const result = await userCollection.findOne({login:login});

        return !!result
    },

    async createUser(userDto:UserInsertModel) {
        const result = await userCollection.insertOne(userDto as UserDocumentModel);


        return result.insertedId.toString()
    },

    async isUserExistById(id:string):Promise<boolean>  {
        const result = await userCollection.findOne({_id:new ObjectId(id)});

        return !!result
    },

    async deleteUser(id:string):Promise<void> {
        await userCollection.deleteOne({_id:new ObjectId(id)});
    },

    async getUserById(id:string):Promise<UserDocumentModel | null> {
        return await userCollection.findOne({_id:new ObjectId(id)});
    },

    async getUserByEmailOrLogin(loginOrEmail:string):Promise<UserDocumentModel | null> {
        return await userCollection.findOne( { $or: [ { email: loginOrEmail }, { login: loginOrEmail } ] } )

    }






}