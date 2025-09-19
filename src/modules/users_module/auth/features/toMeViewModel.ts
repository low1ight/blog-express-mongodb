import {MeViewModel} from "../models/me-view-model";
import {UserDocumentModel} from "../../users/models/user-document-model";

export const toMeViewModel = ({_id,email,login}:UserDocumentModel):MeViewModel => {
    return {
        userId: _id.toString(),
        email,
        login
    }
}