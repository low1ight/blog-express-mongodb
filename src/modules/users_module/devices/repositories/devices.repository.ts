import {DeviceInsertModel} from "../models/device-insert-model";
import {devicesCollection} from "../../../../db/db.mongodb";
import {DeviceDocumentModel} from "../models/device-document-model";
import {ObjectId} from "mongodb";


export const devicesRepository = {

    async create(dto:DeviceInsertModel): Promise<string> {

        const result = await devicesCollection.insertOne(
            {...dto,userId:new ObjectId(dto.userId)} as DeviceDocumentModel)

        return result.insertedId.toString()

    },

    async updateDeviceSessionCodeById(deviceId:string,sessionCode:string,newDate:string)  {
        await devicesCollection.updateOne(
            {_id:new ObjectId(deviceId)},
            {$set: {
                    sessionCode:sessionCode,
                    lastSeenDate:newDate
                }

            })


    },

    async getDeviceById(deviceId:string):Promise<DeviceDocumentModel | null> {
        return await devicesCollection.findOne({_id:new ObjectId(deviceId)})
    },

    async deleteDeviceById(deviceId:string) {
        await devicesCollection.deleteOne({_id:new ObjectId(deviceId)})
    },

    async deleteAllOtherUserDevices(deviceId:string,userId:string) {
        await devicesCollection.deleteMany({
            _id:{$ne:new ObjectId(deviceId)},
            userId: new ObjectId(userId)})
    }



}