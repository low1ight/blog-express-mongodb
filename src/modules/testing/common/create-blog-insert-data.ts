import {BlogInsertModel} from "../../blog_platform/blogs/models/blog-insert-model";

export const createBlogInsertData = (blogCount:number):BlogInsertModel[] => {
    const blogsInsertModels:BlogInsertModel[] = []
    //create 30 blogs
    for(let i = 0; i < blogCount; i++) {

        const blogInsertModel:BlogInsertModel = {
            name:"Blog name " + i,
            description: "Blog desc " + i,
            websiteUrl: "https://www.youtube.com/" + i,
            isMembership:false,
            createdAt: new Date().toISOString()
        }
        blogsInsertModels.push(blogInsertModel)
    }

    return blogsInsertModels
}