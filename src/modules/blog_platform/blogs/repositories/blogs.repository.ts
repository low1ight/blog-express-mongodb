import {BlogInputModel} from "../models/blog-input-model";
import {BlogDocumentModel} from "../models/blog-document-model";
import {Blog} from "../../../../db/models/blog.model";
import {BlogInsertModel} from "../models/blog-insert-model";


export const blogsRepository = {
   async createBlog(dto:BlogInsertModel) {

       const blog:BlogDocumentModel = await Blog.create(dto)

       return blog._id.toString()

   },


   async updateBlog(blogId:string,updateBlogInputModel:BlogInputModel):Promise<boolean> {

    const result = await Blog.updateOne({_id: blogId},{$set:updateBlogInputModel})

    return result.matchedCount === 1
   },

   async deleteBlog(blogId:string):Promise<boolean> {
       const result = await Blog.deleteOne({_id:blogId})

       return result.deletedCount === 1

   },

   async isBlogExists(blogId:string): Promise<boolean> {
       console.log(blogId)
      const blog = await Blog.exists({_id: blogId})


       return !!blog
   }




}