import {PostDocumentModel} from "../models/post-document-model";
import {PostViewModel} from "../models/post-view-model";

export const toPostViewModel = ({_id,title,shortDescription,content,blogId,blogName,createdAt}:PostDocumentModel):PostViewModel => {
    return {
        id: _id.toString(),
        title,
        shortDescription,
        content,
        blogId:blogId.toString(),
        blogName,
        createdAt

    }
}