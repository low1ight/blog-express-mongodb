import {BaseQuery, BaseQueryMapper} from "../../../../utils/queryMapper/baseQueryMapper";

export type BlogQuery = BaseQuery & {
    searchNameTerm?: string
}


export class BlogQueryMapper extends BaseQueryMapper {

    searchNameTerm:string | null;

    constructor(query:BlogQuery) {
        super(query);
        this.searchNameTerm = query.searchNameTerm || null

    }


}