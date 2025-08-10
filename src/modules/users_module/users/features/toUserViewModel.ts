import {UserDocumentModel} from "../models/user-document-model";
import {UserViewModel} from "../models/user-view-model";

export const toUserViewModel = ({_id,email,login,createdAt}:UserDocumentModel):UserViewModel => {
    return {
        id: _id.toString(),
        email,
        login,
        createdAt
    }
}