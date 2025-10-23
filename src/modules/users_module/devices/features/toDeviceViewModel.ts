import {DeviceDocumentModel} from "../models/device-document-model";
import {DeviceViewModel} from "../models/device-view-model";

export const toDeviceViewModel = ({
                                      _id,
                                      title,
                                      ip,
                                      updatedAt


                                  }: DeviceDocumentModel): DeviceViewModel => {


    return {
        deviceId: _id.toString(),
        title,
        ip,
        lastSeenDate:updatedAt
    }
}