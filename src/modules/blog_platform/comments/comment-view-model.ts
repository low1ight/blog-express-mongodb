import {ObjectId} from "mongodb";

export type CommentViewModel = {
    id: ObjectId
    content:string
    commentatorInfo:{
        userId: ObjectId
        userLogin: string
    }
    createdAt:string


}
