import {blogsRepository} from "../../../modules/blog_platform/blogs/repositories/blogs.repository";



export const isBlogExist = async (value:string):Promise<boolean> => {
    return blogsRepository.isBlogExists(value)
}