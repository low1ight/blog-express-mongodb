import {devicesRepository} from "../repositories/devices.repository";

export const devicesService = {

    async createDevice(ip:string,sessionCode:string ) {

        const deviceDto = {
            ip,
            sessionCode,
            lastSeenDate: new Date().toISOString(),
        }

        return await devicesRepository.create(deviceDto)



    }


}