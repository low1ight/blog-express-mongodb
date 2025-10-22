import {Collection, Db, MongoClient} from 'mongodb';
import {SETTINGS} from "../settings";
import {BlogDocumentModel} from "../modules/blog_platform/blogs/models/blog-document-model";
import {PostDocumentModel} from "../modules/blog_platform/posts/models/post-document-model";
import {UserDocumentModel} from "../modules/users_module/users/models/user-document-model";
import {CommentDocumentModel} from "../modules/blog_platform/comments/models/comment-document-model";
import {DeviceDocumentModel} from "../modules/users_module/devices/models/device-document-model";
import {LikeForCommentDocumentModel} from "../modules/blog_platform/comments/models/likeForComment-document-model";
import {LikeForPostDocumentModel} from "../modules/blog_platform/posts/models/likeForPost-document-model";
import mongoose, {Model} from "mongoose";




const USER_COLLECTION_NAME = 'users';
const COMMENT_COLLECTION_NAME = 'comments';
const LIKE_FOR_COMMENT_COLLECTION_NAME = 'likeForComments';
const LIKE_FOR_POST_COLLECTION_NAME = 'likeForPost';
const DEVICE_COLLECTION_NAME = 'devices';


export let client: MongoClient;
export let likeForPostCollection: Collection<LikeForPostDocumentModel>;
export let userCollection: Collection<UserDocumentModel>;
export let commentCollection: Collection<CommentDocumentModel>;
export let likeForCommentCollection: Collection<LikeForCommentDocumentModel>;
export let devicesCollection: Collection<DeviceDocumentModel>;


export async function runDB(url: string): Promise<void> {



    client = new MongoClient(url);
    const db: Db = client.db(SETTINGS.DB.NAME);


    likeForPostCollection = db.collection<LikeForPostDocumentModel>(LIKE_FOR_POST_COLLECTION_NAME);
    userCollection = db.collection<UserDocumentModel>(USER_COLLECTION_NAME);
    commentCollection = db.collection<CommentDocumentModel>(COMMENT_COLLECTION_NAME);
    likeForCommentCollection = db.collection<LikeForCommentDocumentModel>(LIKE_FOR_COMMENT_COLLECTION_NAME);
    devicesCollection = db.collection<DeviceDocumentModel>(DEVICE_COLLECTION_NAME);



    try {
        await client.connect();
        await db.command({ping: 1});
        console.log('readyState:', mongoose.connection.readyState);
        await mongoose.connect(`${url}${SETTINGS.DB.NAME}`);
        console.log('✅ Connected to the database');

    } catch (e) {
        await client.close();
        await mongoose.disconnect()
        throw new Error(`❌ Database not connected: ${e}`);
    }
}