import {devicesCollection} from "../../../../db/mongodb";
import {ObjectId} from "mongodb";
import {DeviceDocumentModel} from "../models/device-document-model";
import {toDeviceViewModel} from "../features/toDeviceViewModel";
import {DeviceViewModel} from "../models/device-view-model";

export const devicesQueryRepository = {


   async getAllDevicesByUserId(userId:string):Promise<DeviceViewModel[]> {
        const devices:DeviceDocumentModel[] = await devicesCollection.find({userId: new ObjectId(userId)}).toArray()

        return devices.map(i => toDeviceViewModel(i))


    }
}