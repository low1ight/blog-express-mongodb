import {BlogViewModel} from "../models/blog-view-model";
import {blogCollection} from "../../../../db/db.mongodb";
import {ObjectId} from "mongodb";
import {toBlogViewModel} from "../features/toBlogViewModel";
import {BlogDocumentModel} from "../models/blog-document-model";

export const blogsQueryRepository = {

   async getBlogs():Promise<BlogViewModel[]> {
       const blogs:BlogDocumentModel[] = await blogCollection.find({}).toArray();
       return blogs.map((blog:BlogDocumentModel) => toBlogViewModel(blog))
    },

    async getBlogById(blogId:string): Promise<BlogViewModel | null> {
        const result = await blogCollection.findOne({_id:new ObjectId(blogId)})
        if(!result){
            return null;
        }
        return toBlogViewModel(result)
    }





}