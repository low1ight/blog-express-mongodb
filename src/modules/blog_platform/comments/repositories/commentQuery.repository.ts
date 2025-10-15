import {commentCollection, likeForCommentCollection, postCollection} from "../../../../db/db.mongodb";
import {ObjectId, SortDirection} from "mongodb";
import {toCommentViewModel} from "../features/toCommentViewModel";
import {BaseQueryMapper} from "../../../../utils/queryMapper/baseQueryMapper";
import {Paginator} from "../../../../utils/paginator/paginator";
import {CommentDocumentModel} from "../models/comment-document-model";
import {CommentViewModel} from "../models/comment-view-model";
import {LikesInfoModel} from "../models/likes-info-model";

export const commentQueryRepository = {


    async getPostComments({
                              sortDirection,
                              sortBy,
                              pageNumber,
                              pageSize
                          }: BaseQueryMapper, postId: string): Promise<Paginator<CommentViewModel>> {

        const skipCount = (pageNumber - 1) * pageSize

        const totalCount: number = await postCollection.countDocuments()


        const filter = {postId: new ObjectId(postId)}


        const comments: CommentDocumentModel[] = await commentCollection
            .find(filter)
            .skip(skipCount)
            .sort({[sortBy]: sortDirection as SortDirection})
            .limit(pageSize)
            .toArray();

        const commentsIds = Array.from(comments,(i) => i._id );

        const likesStatuses = await likeForCommentCollection.aggregate([
            {$match: {commentId: {$in:commentsIds}}},
            {
                $group: {
                    _id: "$commentId",
                    likesCount: {$sum: {$cond: [{$eq: ['$likeStatus', "Like"]}, 1, 0]}},
                    dislikesCount: {$sum: {$cond: [{$eq: ['$likeStatus', "Dislike"]}, 1, 0]}},
                    myStatus: {$max: {$cond: [{$eq: ['$likeStatus', "Dislike"]}, '$likeStatus', null]}}
                }
            }
        ]).toArray() as LikesInfoModel[]

        console.log(likesStatuses)


        const commentsViewModels: CommentViewModel[] = comments.map(comment => {

            const likeStatus:LikesInfoModel = likesStatuses.find(e => e._id = comment._id)!
            return toCommentViewModel(comment, likeStatus)
        })

        return new Paginator<CommentViewModel>(pageNumber, pageSize, totalCount, commentsViewModels)
    },


    async getCommentById(id: string) {
        const comment = await commentCollection.findOne({_id: new ObjectId(id)})

        if (!comment) return null;

        const likeStatus = await likeForCommentCollection.aggregate([
            {$match: {commentId: comment._id}},
            {
                $group: {
                    _id: "$commentId",
                    likesCount: {$sum: {$cond: [{$eq: ['$likeStatus', "Like"]}, 1, 0]}},
                    dislikesCount: {$sum: {$cond: [{$eq: ['$likeStatus', "Dislike"]}, 1, 0]}},
                    myStatus: {$max: {$cond: [{$eq: ['$likeStatus', "Dislike"]}, '$likeStatus', null]}}
                }
            }
        ]).toArray() as LikesInfoModel[]



        return toCommentViewModel(comment,likeStatus[0])

    }


}