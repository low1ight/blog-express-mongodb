import {PostForBlogInputModel} from "../../blog_platform/posts/models/post-for-blog-input-model";

export const createPostForBlogInsertData = (postCount:number):PostForBlogInputModel[] => {
    const postInsertDataArr:PostForBlogInputModel[] = []

    for(let i = 0; i < postCount; i++) {

        const blogInsertModel:PostForBlogInputModel = {

            title:'title ' + i,
            shortDescription: 'description ' + i,
            content: 'conteeenmtasdasdasdasdasdasd ' + i
        }
        postInsertDataArr.push(blogInsertModel)
    }

    return postInsertDataArr
}