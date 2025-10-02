import {DeviceDocumentModel} from "../models/device-document-model";
import {DeviceViewModel} from "../models/device-view-model";

export const toDeviceViewModel = ({
                                      _id,
                                      title,
                                      ip,
                                      lastSeenDate


                                  }: DeviceDocumentModel): DeviceViewModel => {


    return {
        id: _id.toString(),
        title,
        ip,
        lastSeenDate
    }
}