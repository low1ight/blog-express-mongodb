import {DeviceInsertModel} from "../models/device-insert-model";
import {devicesCollection} from "../../../../db/db.mongodb";
import {DeviceDocumentModel} from "../models/device-document-model";


export const devicesRepository = {

    async create(dto:DeviceInsertModel): Promise<string> {

        const result = await devicesCollection.insertOne(dto as DeviceDocumentModel)

        return result.insertedId.toString()

    }



}