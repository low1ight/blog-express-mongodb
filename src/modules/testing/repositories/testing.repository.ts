import {
    blogCollection,
    commentCollection,
    devicesCollection,
    postCollection,
    userCollection
} from "../../../db/db.mongodb";


export const testingRepository = {


    async deleteAllData() {
        await blogCollection.deleteMany({});
        await postCollection.deleteMany({});
        await userCollection.deleteMany({});
        await commentCollection.deleteMany({});
        await devicesCollection.deleteMany({});

    }



}