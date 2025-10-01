import {devicesRepository} from "../repositories/devices.repository";
import {DeviceDocumentModel} from "../models/device-document-model";

export const devicesService = {

    async createDevice(ip:string,sessionCode:string ) {

        const deviceDto = {
            ip,
            sessionCode,
            lastSeenDate: new Date().toISOString(),
        }

        return await devicesRepository.create(deviceDto)



    },


    async updateDeviceSessionCode(deviceId:string,sessionCode:string) {
        const newDate = new Date().toISOString();
        await devicesRepository.updateDeviceSessionCodeById(deviceId,sessionCode,newDate)

    },


    async getDeviceById(deviceId:string):Promise<DeviceDocumentModel | null> {
        return await devicesRepository.getDeviceById(deviceId)

    }


}