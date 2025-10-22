import mongoose from "mongoose";
import {BlogDocumentModel} from "../../modules/blog_platform/blogs/models/blog-document-model";

const BLOG_COLLECTION_NAME = 'blogs';


export const blogSchema = new mongoose.Schema<BlogDocumentModel>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    isMembership: { type: Boolean, required: true },
}, { timestamps: true })


export const Blog = mongoose.model(BLOG_COLLECTION_NAME, blogSchema);