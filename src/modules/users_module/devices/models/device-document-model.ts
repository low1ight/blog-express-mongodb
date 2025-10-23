import {ObjectId} from "mongodb";

export type DeviceDocumentModel = {
    _id: ObjectId
    userId: ObjectId
    sessionCode:string
    title:string
    ip:string
    createdAt: string
    updatedAt: string
}