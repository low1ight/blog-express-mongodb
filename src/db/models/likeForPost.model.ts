import mongoose from "mongoose";
import {ObjectId} from "mongodb";
import {likeTypesArr} from "../../modules/blog_platform/common/Like.type";
import {LikeForPostDocumentModel} from "../../modules/blog_platform/posts/models/likeForPost-document-model";

const LIKE_FOR_POST_COLLECTION_NAME = 'likesForPosts';


export const likeForPostSchema = new mongoose.Schema<LikeForPostDocumentModel>({
    userId: { type: ObjectId, required: true },
    userLogin: { type: String, required: true },
    postId:{ type: ObjectId, required: true },
    likeStatus: { type: String, enum: likeTypesArr, required: true },
}, { timestamps: true })


export const LikeForPost = mongoose.model<LikeForPostDocumentModel>(LIKE_FOR_POST_COLLECTION_NAME, likeForPostSchema);