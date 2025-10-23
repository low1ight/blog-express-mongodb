import mongoose from "mongoose";
import {ObjectId} from "mongodb";
import {LikeForCommentDocumentModel} from "../../modules/blog_platform/comments/models/likeForComment-document-model";
import {likeTypesArr} from "../../modules/blog_platform/common/Like.type";

const LIKE_FOR_COMMENT_COLLECTION_NAME = 'likesForComments';


export const likeForCommentSchema = new mongoose.Schema<LikeForCommentDocumentModel>({
    userId: { type: ObjectId, required: true },
    commentId: { type: ObjectId, required: true },
    likeStatus: { type: String, enum: likeTypesArr, required: true },
}, { timestamps: true })


export const LikeForComment = mongoose.model<LikeForCommentDocumentModel>(LIKE_FOR_COMMENT_COLLECTION_NAME, likeForCommentSchema);