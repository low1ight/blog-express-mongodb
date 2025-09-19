import {Collection, Db, MongoClient} from 'mongodb';
import {SETTINGS} from "../settings";
import {BlogDocumentModel} from "../modules/blog_platform/blogs/models/blog-document-model";
import {PostDocumentModel} from "../modules/blog_platform/posts/models/post-document-model";
import {UserDocumentModel} from "../modules/users_module/users/models/user-document-model";
import {CommentDocumentModel} from "../modules/blog_platform/comments/models/comment-document-model";


const BLOG_COLLECTION_NAME = 'blogs';
const POST_COLLECTION_NAME = 'posts';
const USER_COLLECTION_NAME = 'users';
const COMMENT_COLLECTION_NAME = 'comments';

export let client: MongoClient;
export let blogCollection: Collection<BlogDocumentModel>;
export let postCollection: Collection<PostDocumentModel>;
export let userCollection: Collection<UserDocumentModel>;
export let commentCollection: Collection<CommentDocumentModel>;


export async function runDB(url: string): Promise<void> {
    client = new MongoClient(url);
    const db: Db = client.db(SETTINGS.DB.NAME);


   blogCollection = db.collection<BlogDocumentModel>(BLOG_COLLECTION_NAME);
   postCollection = db.collection<PostDocumentModel>(POST_COLLECTION_NAME);
   userCollection = db.collection<UserDocumentModel>(USER_COLLECTION_NAME);
   commentCollection = db.collection<CommentDocumentModel>(COMMENT_COLLECTION_NAME);

    try {
        await client.connect();
        await db.command({ ping: 1 });
        console.log('✅ Connected to the database');
    } catch (e) {
        await client.close();
        throw new Error(`❌ Database not connected: ${e}`);
    }
}