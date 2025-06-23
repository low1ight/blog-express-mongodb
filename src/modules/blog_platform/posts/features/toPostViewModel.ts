import {PostDocumentModel} from "../models/post-document-model";

export const toPostViewModel = ({_id,title,shortDescription,content,blogName,createdAt}:PostDocumentModel) => {
    return {
        id: _id.toString(),
        title,
        shortDescription,
        content,
        blogName,
        createdAt

    }
}