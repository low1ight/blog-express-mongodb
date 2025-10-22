import mongoose from "mongoose";
import {CommentDocumentModel} from "../../modules/blog_platform/comments/models/comment-document-model";
import {ObjectId} from "mongodb";

const COMMENT_COLLECTION_NAME = 'comments';


export const commentSchema = new mongoose.Schema<CommentDocumentModel>({
    content:{ type: String, required: true },
    userId: { type: ObjectId, required: true },
    userLogin: { type: String, required: true },
    postId: { type: ObjectId, required: true },
}, { timestamps: true })


export const Blog = mongoose.model<CommentDocumentModel>(COMMENT_COLLECTION_NAME, commentSchema);