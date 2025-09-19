import {commentCollection} from "../../../../db/db.mongodb";
import {ObjectId} from "mongodb";
import {toCommentViewModel} from "../features/toCommentViewModel";

export const commentQueryRepository = {

    getCommentById: async (id: string) => {
        const comment =  await commentCollection.findOne({_id:new ObjectId(id)})

        if(!comment) return null;

        return toCommentViewModel(comment)

    }



}