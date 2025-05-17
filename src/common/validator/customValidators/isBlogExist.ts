import {blogsRepository} from "../../../modules/blog_platform/blogs/repositories/blogs.repository";



export const isBlogExist = (value:string):boolean => {
    return blogsRepository.isBlogExists(value)
}