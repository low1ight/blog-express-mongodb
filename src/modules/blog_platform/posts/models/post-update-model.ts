import {ObjectId} from "mongodb";

export type PostUpdateModel = {
    title: string;
    shortDescription: string;
    content: string;
    blogId: ObjectId;
    blogName:string

}