import {userCollection} from "../../../../db/db.mongodb";
import {UserDocumentModel} from "../models/user-document-model";
import {UserInsertModel} from "../models/user-insert-model";

export const userRepository = {

    async isEmailExist(email:string):Promise<boolean> {
        const result = await userCollection.findOne({email:email});

        return !!result
    },

    async createUser(userDto:UserInsertModel) {
        const result = await userCollection.insertOne(userDto as UserDocumentModel);

        console.log(result.insertedId)

        return result.insertedId.toString()
    }




}