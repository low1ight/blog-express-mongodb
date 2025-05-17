import {BlogDocumentModel} from "../models/blog-document-model";
import {BlogViewModel} from "../models/blog-view-model";

export const toBlogViewModel = ({ _id,
                                    name,
                                    description,
                                    websiteUrl,
                                    createdAt,
                                    isMembership}:BlogDocumentModel):BlogViewModel => {


    return {
        id:_id.toString(),
        name,
        description,
        websiteUrl,
        createdAt,
        isMembership
    }
}