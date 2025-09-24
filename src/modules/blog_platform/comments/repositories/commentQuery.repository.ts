import {commentCollection, postCollection} from "../../../../db/db.mongodb";
import {ObjectId, SortDirection} from "mongodb";
import {toCommentViewModel} from "../features/toCommentViewModel";
import {BaseQueryMapper} from "../../../../utils/queryMapper/baseQueryMapper";
import {Paginator} from "../../../../utils/paginator/paginator";
import {CommentDocumentModel} from "../models/comment-document-model";
import {CommentViewModel} from "../models/comment-view-model";

export const commentQueryRepository = {




    async getPostComments({sortDirection,sortBy,pageNumber,pageSize}:BaseQueryMapper,postId:string):Promise<Paginator<CommentViewModel>> {

        const skipCount = (pageNumber - 1) * pageSize

        const totalCount:number = await postCollection.countDocuments()


        const filter = {postId: new ObjectId(postId)}


        const comments:CommentDocumentModel[] = await commentCollection
            .find(filter)
            .skip(skipCount)
            .sort({[sortBy]:sortDirection as SortDirection})
            .limit(pageSize)
            .toArray();

        const commentsViewModels:CommentViewModel[] = comments.map(comment => toCommentViewModel(comment))

        return new Paginator<CommentViewModel>(pageNumber,pageSize,totalCount,commentsViewModels)
    },





    getCommentById: async (id: string) => {
        const comment =  await commentCollection.findOne({_id:new ObjectId(id)})

        if(!comment) return null;

        return toCommentViewModel(comment)

    }



}