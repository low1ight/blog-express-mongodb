import {DeviceInsertModel} from "../models/device-insert-model";
import {DeviceDocumentModel} from "../models/device-document-model";
import {ObjectId} from "mongodb";
import {Device} from "../../../../db/models/device.model";


export const devicesRepository = {

    async create(dto:DeviceInsertModel): Promise<string> {

        const result = await Device.create(
            {...dto,userId:new ObjectId(dto.userId)})

        return result._id.toString()

    },

    async updateDeviceSessionCodeById(deviceId:string,sessionCode:string)  {
        await Device.updateOne(
            {_id:deviceId},
            {$set: {
                    sessionCode:sessionCode,
                }

            })


    },

    async getDeviceById(deviceId:string):Promise<DeviceDocumentModel | null> {
        return Device.findOne({_id:deviceId})
    },

    async deleteDeviceById(deviceId:string) {
        await Device.deleteOne({_id:deviceId})
    },

    async deleteAllOtherUserDevices(deviceId:string,userId:string) {
        await Device.deleteMany({
            _id:{$ne:deviceId},
            userId: userId})
    }



}