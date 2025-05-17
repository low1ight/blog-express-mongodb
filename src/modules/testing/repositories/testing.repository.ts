import {blogCollection, postCollection} from "../../../db/db.mongodb";


export const testingRepository = {


    async deleteAllData() {
        await blogCollection.deleteMany({});
        await postCollection.deleteMany({});
    }



}