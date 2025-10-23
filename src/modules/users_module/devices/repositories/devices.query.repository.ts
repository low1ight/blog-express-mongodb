import {DeviceDocumentModel} from "../models/device-document-model";
import {toDeviceViewModel} from "../features/toDeviceViewModel";
import {DeviceViewModel} from "../models/device-view-model";
import {Device} from "../../../../db/models/device.model";

export const devicesQueryRepository = {


   async getAllDevicesByUserId(userId:string):Promise<DeviceViewModel[]> {
        const devices:DeviceDocumentModel[] = await Device.find({userId: userId}).lean()

        return devices.map(i => toDeviceViewModel(i))


    }
}