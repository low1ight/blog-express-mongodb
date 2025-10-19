import {ObjectId} from "mongodb";
import {NewestLikesViewModel} from "./newest-likes-view-model";

export type NewestLikeDocumentModel = {
    _id:ObjectId
    newestLikes:NewestLikesViewModel[]
}