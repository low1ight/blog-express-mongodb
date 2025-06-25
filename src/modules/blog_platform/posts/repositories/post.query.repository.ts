import {PostViewModel} from "../models/post-view-model";
import {postCollection} from "../../../../db/db.mongodb";
import {ObjectId, SortDirection} from "mongodb";
import {PostDocumentModel} from "../models/post-document-model";
import {toPostViewModel} from "../features/toPostViewModel";
import {BaseQueryMapper} from "../../../../utils/queryMapper/baseQueryMapper";
import {Paginator} from "../../../../utils/paginator/paginator";


export const postQueryRepository = {


    async getPosts({sortDirection,sortBy,pageNumber,pageSize}:BaseQueryMapper):Promise<Paginator<PostViewModel>> {

        const skipCount = (pageNumber - 1) * pageSize

        const totalCount:number = await postCollection.countDocuments()


        const posts:PostDocumentModel[] = await postCollection
            .find()
            .skip(skipCount)
            .sort({[sortBy]:sortDirection as SortDirection})
            .limit(pageSize)
            .toArray();

        const postViewModel:PostViewModel[] = posts.map(post => toPostViewModel(post))

        return new Paginator<PostViewModel>(pageNumber,pageSize,totalCount,postViewModel)
    },

    async getPostById(id:string):Promise<PostViewModel | null>  {
        const post: PostDocumentModel | null = await postCollection.findOne({_id: new ObjectId(id)})

        if(!post){
            return null
        }

        return toPostViewModel(post)


    }

}