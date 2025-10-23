import {SETTINGS} from "../settings";
import mongoose from "mongoose";


export async function runDB(url: string): Promise<void> {

    try {
        await mongoose.connect(`${url}${SETTINGS.DB.NAME}`);
        console.log('✅ Connected to the database');

    } catch (e) {
        await mongoose.disconnect()
        throw new Error(`❌ Database not connected: ${e}`);
    }
}