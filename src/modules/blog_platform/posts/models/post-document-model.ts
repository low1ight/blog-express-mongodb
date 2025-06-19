import {ObjectId} from "mongodb";

export type PostDocumentModel = {
    _id: ObjectId;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName:string;
    createdAt: string;
}