import {ObjectId} from "mongodb";

export type  CommentDocumentModel = {
    _id: ObjectId
    content:string
    userId: ObjectId
    userLogin: string
    postId: ObjectId
    createdAt:string


}
