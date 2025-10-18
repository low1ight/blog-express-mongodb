import {ExtendedLikeInfoViewModel} from "./extendedLikeInfo-view-model";

export type PostViewModel = {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId:string
    blogName:string
    createdAt: string;
    extendedLikesInfo:ExtendedLikeInfoViewModel
}