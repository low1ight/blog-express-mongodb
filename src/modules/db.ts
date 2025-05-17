import {BlogViewModel} from "./blog_platform/blogs/models/blog-view-model";
import {PostViewModel} from "./blog_platform/posts/models/post-view-model";

const db:{blogs:BlogViewModel[],posts:PostViewModel[],setBlogs:any,setPosts:any} = {
    blogs:[],
    posts:[],

    setBlogs(blogArr:BlogViewModel[]) {
        this.blogs = blogArr;
    },

    setPosts(postsArr:PostViewModel[]) {
        this.posts = postsArr;
    }

}

export default db