import {ObjectId} from "mongodb";

export type DeviceDocumentModel = {
    _id: ObjectId
    sessionCode:string
    ip:string
    lastSeenDate: string
}