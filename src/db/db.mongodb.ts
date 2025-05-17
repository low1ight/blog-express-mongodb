import {Collection, Db, MongoClient} from 'mongodb';
import {SETTINGS} from "../settings";
import {BlogDocumentModel} from "../modules/blog_platform/blogs/models/blog-document-model";
import {PostDocumentModel} from "../modules/blog_platform/posts/models/post-document-model";


const BLOG_COLLECTION_NAME = 'blogs';
const POST_COLLECTION_NAME = 'posts';

export let client: MongoClient;
export let blogCollection: Collection<BlogDocumentModel>;
export let postCollection: Collection<PostDocumentModel>;


export async function runDB(url: string): Promise<void> {
    client = new MongoClient(url);
    const db: Db = client.db(SETTINGS.DB.NAME);


   blogCollection = db.collection<BlogDocumentModel>(BLOG_COLLECTION_NAME);
   postCollection = db.collection<PostDocumentModel>(POST_COLLECTION_NAME);

    try {
        await client.connect();
        await db.command({ ping: 1 });
        console.log('✅ Connected to the database');
    } catch (e) {
        await client.close();
        throw new Error(`❌ Database not connected: ${e}`);
    }
}