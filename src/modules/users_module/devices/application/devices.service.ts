import {devicesRepository} from "../repositories/devices.repository";
import {DeviceDocumentModel} from "../models/device-document-model";
import {CustomResponse} from "../../../../utils/customResponse/customResponse";
import {CustomResponseEnum} from "../../../../utils/customResponse/customResponseEnum";

export const devicesService = {

    async createDevice(ip:string, sessionCode:string, userId:string, title:string) {

        const deviceDto = {
            ip,
            userId:userId,
            sessionCode,
            title,
            lastSeenDate: new Date().toISOString(),
        }

        return await devicesRepository.create(deviceDto)


    },

    async deleteOtherDevices(currentDeviceId:string,userId:string,) {
        await devicesRepository.deleteAllOtherUserDevices(currentDeviceId,userId)
    },

    async deleteDeviceById(deviceId:string,userId:string,) {
        const device = await devicesRepository.getDeviceById(deviceId)

        if(!device){
            return new CustomResponse(false, CustomResponseEnum.INVALID_URI, "Not found")
        }

        if(device.userId.toString() !== userId){
            return new CustomResponse(false, CustomResponseEnum.NO_ACCESS, "Cant delete device of other user")
        }

        await devicesRepository.deleteDeviceById(deviceId)

        return new CustomResponse(true, null, 'successfully')


    },


    async updateDeviceSessionCode(deviceId:string,sessionCode:string) {
        const newDate = new Date().toISOString();
        await devicesRepository.updateDeviceSessionCodeById(deviceId,sessionCode,newDate)

    },


    async getDeviceById(deviceId:string):Promise<DeviceDocumentModel | null> {
        return await devicesRepository.getDeviceById(deviceId)

    }


}