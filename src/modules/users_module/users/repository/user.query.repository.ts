import {UserViewModel} from "../models/user-view-model";
import {userCollection} from "../../../../db/db.mongodb";
import {ObjectId} from "mongodb";
import {UserDocumentModel} from "../models/user-document-model";
import {toUserViewModel} from "../features/toUserViewModel";


export const userQueryRepository = {


   async getUserById(userId:string):Promise<UserViewModel | null> {

        const user:UserDocumentModel | null = await userCollection.findOne({_id:new ObjectId(userId)})

       if(!user){
           return null
       }

       return toUserViewModel(user);



    }

}