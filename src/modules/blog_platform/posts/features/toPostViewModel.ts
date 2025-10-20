import {PostDocumentModel} from "../models/post-document-model";
import {PostViewModel} from "../models/post-view-model";
import {LikeInfoDocumentModel} from "../models/like-info-document-model";
import {NewestLikesViewModel} from "../models/newest-likes-view-model";

export const toPostViewModel = ({
                                    _id,
                                    title,
                                    shortDescription,
                                    content,
                                    blogId,
                                    blogName,
                                    createdAt
                                }: PostDocumentModel,
                                newestLikes:NewestLikesViewModel[],
                                likesInfo?: LikeInfoDocumentModel,
                                ): PostViewModel => {
    return {
        id: _id.toString(),
        title,
        shortDescription,
        content,
        blogId: blogId.toString(),
        blogName,
        createdAt,
        extendedLikesInfo: {
            likesCount: likesInfo?.likesCount || 0,
            dislikesCount: likesInfo?.dislikesCount || 0,
            myStatus: likesInfo?.myStatus || 'None',
            newestLikes:newestLikes
        }


    }
}