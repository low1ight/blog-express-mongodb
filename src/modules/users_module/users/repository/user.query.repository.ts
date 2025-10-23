import {UserViewModel} from "../models/user-view-model";
import {SortDirection} from "mongodb";
import {UserDocumentModel} from "../models/user-document-model";
import {toUserViewModel} from "../features/toUserViewModel";
import {Paginator} from "../../../../utils/paginator/paginator";
import {UserQueryMapper} from "../features/userQueryMapper";
import {User} from "../../../../db/models/user.model";


export const userQueryRepository = {


    async getUsers({pageNumber,pageSize,sortBy,sortDirection,searchEmailTerm,searchLoginTerm}:UserQueryMapper) {

        const skipCount = (pageNumber - 1) * pageSize

        let filter = {}
        if(searchEmailTerm) {
            filter = {...filter,email: { $regex: searchEmailTerm, $options: "i" }}
        }
        if(searchLoginTerm) {
            filter = {...filter,login: { $regex: searchLoginTerm, $options: "i" }}
        }


        const totalCount:number = await User
            .countDocuments(filter)

        const users:UserDocumentModel[] = await User
            .find(filter)
            .skip(skipCount)
            .sort({[sortBy]:sortDirection as SortDirection})
            .limit(pageSize)
            .lean();


        const usersViewModel:UserViewModel[] = users.map((user:UserDocumentModel) => toUserViewModel(user))

        return new Paginator<UserViewModel>(pageNumber,pageSize,totalCount,usersViewModel)


    },

   async getUserById(userId:string):Promise<UserViewModel | null> {

        const user:UserDocumentModel | null = await User.findOne({_id:userId}).lean()

       if(!user){
           return null
       }

       return toUserViewModel(user);



    }

}