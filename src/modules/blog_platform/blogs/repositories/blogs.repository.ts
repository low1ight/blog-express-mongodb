import {blogCollection} from "../../../../db/db.mongodb";
import {BlogInputModel} from "../models/blog-input-model";
import {BlogDocumentModel} from "../models/blog-document-model";
import {ObjectId} from "mongodb";

 type BlogInsertModel = {
   name: string
   description: string
   websiteUrl: string
   createdAt: string
   isMembership: boolean
}

export const blogsRepository = {
   async createBlog(blog:BlogInsertModel) {


       const result = await blogCollection.insertOne(blog as BlogDocumentModel);

       return result.insertedId.toString()

   },


   async updateBlog(blogId:string,updateBlogInputModel:BlogInputModel):Promise<boolean> {

    const result = await blogCollection.updateOne({_id: new ObjectId(blogId)},{$set:updateBlogInputModel})

    return result.matchedCount === 1
   },

   async deleteBlog(blogId:string):Promise<boolean> {
       const result = await blogCollection.deleteOne({_id:new ObjectId(blogId)})

       return result.deletedCount === 1

   },

   async isBlogExists(blogId:string): Promise<boolean> {
      const blog = await blogCollection.findOne({_id: new ObjectId(blogId)})

       return !!blog
   }




}