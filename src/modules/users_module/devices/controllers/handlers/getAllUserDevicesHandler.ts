import {Request, Response} from "express";
import {DeviceViewModel} from "../../models/device-view-model";
import {devicesQueryRepository} from "../../repositories/devices.query.repository";


export const getAllUserDevicesHandler = async (req: Request, res: Response) => {
    const userDevices: DeviceViewModel[] = await devicesQueryRepository.getAllDevicesByUserId(req.user.userId)

    res.json(userDevices)


}