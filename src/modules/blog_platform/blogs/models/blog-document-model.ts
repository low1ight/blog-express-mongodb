import {ObjectId} from "mongodb";

export type BlogDocumentModel = {
    _id: ObjectId
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}