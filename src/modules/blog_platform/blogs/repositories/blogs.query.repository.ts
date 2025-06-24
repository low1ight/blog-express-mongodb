import {BlogViewModel} from "../models/blog-view-model";
import {blogCollection} from "../../../../db/db.mongodb";
import {ObjectId} from "mongodb";
import {toBlogViewModel} from "../features/toBlogViewModel";
import {BlogDocumentModel} from "../models/blog-document-model";
import {BlogQueryMapper} from "../features/blogQueryMapper";
import {Paginator} from "../../../../utils/paginator/paginator";

export const blogsQueryRepository = {

   async getBlogs({pageNumber,pageSize,searchNameTerm}:BlogQueryMapper):Promise<Paginator<BlogViewModel>> {

       const skipCount = (pageNumber - 1) * pageSize
       const filter = searchNameTerm ? {name: searchNameTerm} : {}

       const totalCount:number = await blogCollection
           .countDocuments(filter)


       const blogs:BlogDocumentModel[] = await blogCollection
           .find(filter)
           .skip(skipCount)
           .limit(pageSize)
           .toArray();


       const blogViewModel:BlogViewModel[] = blogs.map((blog:BlogDocumentModel) => toBlogViewModel(blog))

       return new Paginator<BlogViewModel>(pageNumber,pageSize,totalCount,blogViewModel)
    },

    async getBlogById(blogId:string): Promise<BlogViewModel | null> {
        const result = await blogCollection.findOne({_id:new ObjectId(blogId)})
        if(!result){
            return null;
        }
        return toBlogViewModel(result)
    }





}