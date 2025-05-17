import {PostViewModel} from "../models/post-view-model";
import {postCollection} from "../../../../db/db.mongodb";
import {ObjectId} from "mongodb";
import {PostDocumentModel} from "../models/post-document-model";
import {toPostViewModel} from "../features/toPostViewModel";


export const postQueryRepository = {


    async getPosts():Promise<PostViewModel[]> {
        const posts:PostDocumentModel[] = await postCollection.find().toArray()

        return posts.map(post => toPostViewModel(post))
    },

    async getPostById(id:string):Promise<PostViewModel | null>  {
        const post: PostDocumentModel | null = await postCollection.findOne({_id: new ObjectId(id)})

        if(!post){
            return null
        }

        return toPostViewModel(post)


    }

}