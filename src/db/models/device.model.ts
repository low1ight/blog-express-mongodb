import mongoose from "mongoose";
import {DeviceDocumentModel} from "../../modules/users_module/devices/models/device-document-model";
import {ObjectId} from "mongodb";

const DEVICE_COLLECTION_NAME = 'devices';


export const deviceSchema = new mongoose.Schema<DeviceDocumentModel>({
    userId: { type: ObjectId, required: true },
    sessionCode:{ type: String, required: true },
    title:{ type: String, required: true },
    ip:{ type: String, required: true },
}, { timestamps: true })


export const Device = mongoose.model<DeviceDocumentModel>(DEVICE_COLLECTION_NAME, deviceSchema);