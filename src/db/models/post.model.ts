import mongoose from "mongoose";
import {PostDocumentModel} from "../../modules/blog_platform/posts/models/post-document-model";
import {ObjectId} from "mongodb";

const POST_COLLECTION_NAME = 'posts';

export const postSchema = new mongoose.Schema<PostDocumentModel>({
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    content: {type: String, required: true},
    blogId: {type: ObjectId, required: true},
    blogName:{type: String, required: true},
}, {timestamps: true})



export const Post = mongoose.model<PostDocumentModel>(POST_COLLECTION_NAME, postSchema);