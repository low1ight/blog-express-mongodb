import {PostDocumentModel} from "../models/post-document-model";

export const toPostViewModel = ({_id,title,shortDescription,content,blogId,blogName,createdAt}:PostDocumentModel) => {
    return {
        id: _id.toString(),
        title,
        shortDescription,
        content,
        blogId,
        blogName,
        createdAt

    }
}