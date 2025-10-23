import {ObjectId, SortDirection} from "mongodb";
import {toCommentViewModel} from "../features/toCommentViewModel";
import {BaseQueryMapper} from "../../../../utils/queryMapper/baseQueryMapper";
import {Paginator} from "../../../../utils/paginator/paginator";
import {CommentDocumentModel} from "../models/comment-document-model";
import {CommentViewModel} from "../models/comment-view-model";
import {LikesInfoModel} from "../models/likes-info-model";
import {Comment} from "../../../../db/models/comment.model";
import {LikeForComment} from "../../../../db/models/likeForComment.model";

export const commentQueryRepository = {


    async getPostComments({
                              sortDirection,
                              sortBy,
                              pageNumber,
                              pageSize
                          }: BaseQueryMapper, postId: string, userId: string | null): Promise<Paginator<CommentViewModel>> {

        const skipCount = (pageNumber - 1) * pageSize




        const filter = {postId: new ObjectId(postId)}

        const totalCount: number = await Comment.countDocuments(filter)


        const comments: CommentDocumentModel[] = await Comment
            .find(filter)
            .skip(skipCount)
            .sort({[sortBy]: sortDirection as SortDirection})
            .limit(pageSize)
            .lean();

        const commentsIds = Array.from(comments,(i) => i._id );


        const likesStatuses = await LikeForComment.aggregate()
            .match({commentId: {$in:commentsIds}})
            .group({
                _id: "$commentId",
                likesCount: {$sum: {$cond: [{$eq: ['$likeStatus', "Like"]}, 1, 0]}},
                dislikesCount: {$sum: {$cond: [{$eq: ['$likeStatus', "Dislike"]}, 1, 0]}},
                myStatus: {$max: {$cond: [{$eq: ['$userId', userId && new ObjectId(userId)]}, '$likeStatus', null]}}
            }).exec() as LikesInfoModel[]



        const commentsViewModels: CommentViewModel[] = comments.map(comment => {


            const likeStatus:LikesInfoModel | undefined = likesStatuses.find(e => e._id.equals(comment._id))

            return toCommentViewModel(comment, likeStatus)
        })

        return new Paginator<CommentViewModel>(pageNumber, pageSize, totalCount, commentsViewModels)
    },


    async getCommentById(commentId: string, userId: string | null): Promise<CommentViewModel | null> {
        const comment:CommentDocumentModel | null = await Comment.findOne({_id: commentId}).lean()


        if (!comment) return null;


        const likeStatus = await LikeForComment
            .aggregate()
            .match({commentId: comment._id})
            .group({
                _id: "$commentId",
                likesCount: {$sum: {$cond: [{$eq: ['$likeStatus', "Like"]}, 1, 0]}},
                dislikesCount: {$sum: {$cond: [{$eq: ['$likeStatus', "Dislike"]}, 1, 0]}},
                myStatus: {$max: {$cond: [{$eq: ['$userId',userId && new ObjectId(userId)]}, '$likeStatus', null]}}
            }).exec() as LikesInfoModel[]


        return toCommentViewModel(comment,likeStatus[0])

    }


}