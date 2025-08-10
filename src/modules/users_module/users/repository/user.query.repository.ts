import {UserViewModel} from "../models/user-view-model";
import {userCollection} from "../../../../db/db.mongodb";
import {ObjectId, SortDirection} from "mongodb";
import {UserDocumentModel} from "../models/user-document-model";
import {toUserViewModel} from "../features/toUserViewModel";
import {Paginator} from "../../../../utils/paginator/paginator";
import {UserQueryMapper} from "../features/userQueryMapper";


export const userQueryRepository = {


    async getUsers({pageNumber,pageSize,sortBy,sortDirection,searchEmailTerm,searchLoginTerm}:UserQueryMapper) {

        const skipCount = (pageNumber - 1) * pageSize
        //const filter = searchNameTerm ? {name: { $regex: searchNameTerm, $options: "i" } } : {}
        let filter = {}
        if(searchEmailTerm) {
            filter = {...filter,email: { $regex: searchEmailTerm, $options: "i" }}
        }
        if(searchLoginTerm) {
            filter = {...filter,login: { $regex: searchLoginTerm, $options: "i" }}
        }

        console.log(filter)

        const totalCount:number = await userCollection
            .countDocuments(filter)

        const users:UserDocumentModel[] = await userCollection
            .find(filter)
            .skip(skipCount)
            .sort({[sortBy]:sortDirection as SortDirection})
            .limit(pageSize)
            .toArray();


        const usersViewModel:UserViewModel[] = users.map((user:UserDocumentModel) => toUserViewModel(user))

        return new Paginator<UserViewModel>(pageNumber,pageSize,totalCount,usersViewModel)


    },

   async getUserById(userId:string):Promise<UserViewModel | null> {

        const user:UserDocumentModel | null = await userCollection.findOne({_id:new ObjectId(userId)})

       if(!user){
           return null
       }

       return toUserViewModel(user);



    }

}