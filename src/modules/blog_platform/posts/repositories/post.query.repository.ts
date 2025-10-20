import {PostViewModel} from "../models/post-view-model";
import {likeForPostCollection, postCollection} from "../../../../db/db.mongodb";
import {ObjectId, SortDirection} from "mongodb";
import {PostDocumentModel} from "../models/post-document-model";
import {toPostViewModel} from "../features/toPostViewModel";
import {BaseQueryMapper} from "../../../../utils/queryMapper/baseQueryMapper";
import {Paginator} from "../../../../utils/paginator/paginator";
import {LikeInfoDocumentModel} from "../models/like-info-document-model";
import {NewestLikeDocumentModel} from "../models/newestLike-document-model";


export const postQueryRepository = {


    async getPosts({
                       sortDirection,
                       sortBy,
                       pageNumber,
                       pageSize
                   }: BaseQueryMapper,
                   userId:string | null,
                   blogId?: string,
                  ): Promise<Paginator<PostViewModel>> {

        const skipCount = (pageNumber - 1) * pageSize


        let id: string | null
        if (blogId && ObjectId.isValid(blogId)) id = blogId
        else id = null


        const filter = id ? {blogId: new ObjectId(id)} : {}

        const totalCount: number = await postCollection.countDocuments(filter)
        const posts: PostDocumentModel[] = await postCollection
            .find(filter)
            .skip(skipCount)
            .sort({[sortBy]: sortDirection as SortDirection})
            .limit(pageSize)
            .toArray();

        const postsIds:ObjectId[] = posts.map(p => p._id)


        const likeStatuses = await likeForPostCollection.aggregate([
            {$match: {postId:{$in:postsIds}}},
            {
                $group: {
                    _id: "$postId",
                    likesCount: {$sum: {$cond: [{$eq: ['$likeStatus', "Like"]}, 1, 0]}},
                    dislikesCount: {$sum: {$cond: [{$eq: ['$likeStatus', "Dislike"]}, 1, 0]}},
                    myStatus: {$max: {$cond: [{$eq: ['$userId', userId && new ObjectId(userId)]}, '$likeStatus', null]}},
                }
            }
        ]).toArray() as LikeInfoDocumentModel[]


        const lastsLikes = await likeForPostCollection.aggregate([
            {$match: {postId: {$in:postsIds}, likeStatus: "Like"},},
            {
                $group: {
                    _id: "$postId",
                    newestLikes: {
                        $topN: {
                            sortBy: {addedAt: -1},
                            output: {login: "$userLogin", userId: "$userId", addedAt: "$addedAt"},
                            n: 5,
                        }
                    }
                }
            }
        ]).toArray() as NewestLikeDocumentModel[]


        const postViewModel: PostViewModel[] = posts.map(post =>
            toPostViewModel(
                post,
                lastsLikes.find(i => i._id.equals(post._id))?.newestLikes || [],
                likeStatuses.find(i => i._id.equals(post._id))));

        return new Paginator<PostViewModel>(pageNumber, pageSize, totalCount, postViewModel)
    },

    async getPostById(id: string, userId: string | null): Promise<PostViewModel | null> {
        const post: PostDocumentModel | null = await postCollection.findOne({_id: new ObjectId(id)})


        if (!post) {
            return null
        }


        const likeStatus = await likeForPostCollection.aggregate([
            {$match: {postId: post._id}},
            {
                $group: {
                    _id: "$postId",
                    likesCount: {$sum: {$cond: [{$eq: ['$likeStatus', "Like"]}, 1, 0]}},
                    dislikesCount: {$sum: {$cond: [{$eq: ['$likeStatus', "Dislike"]}, 1, 0]}},
                    myStatus: {$max: {$cond: [{$eq: ['$userId', userId && new ObjectId(userId)]}, '$likeStatus', null]}},
                }
            }
        ]).toArray() as LikeInfoDocumentModel[]


        const lastLikes = await likeForPostCollection.aggregate([
            {$match: {postId: post._id, likeStatus: "Like"},},
            {
                $group: {
                    _id: "$postId",
                    newestLikes: {
                        $topN: {
                            sortBy: {addedAt: -1},
                            output: {login: "$userLogin", userId: "$userId", addedAt: "$addedAt"},
                            n: 5,
                        }
                    }
                }
            }
        ]).toArray() as NewestLikeDocumentModel[]

        return toPostViewModel(post,lastLikes[0].newestLikes,likeStatus[0])

    }

}