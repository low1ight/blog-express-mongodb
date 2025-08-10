import {BaseQuery, BaseQueryMapper} from "../../../../utils/queryMapper/baseQueryMapper";

export type UserQuery = BaseQuery & {
    searchLoginTerm?:string
    searchEmailTerm?:string

 }


 export class UserQueryMapper extends BaseQueryMapper {


     searchLoginTerm: string | null;
     searchEmailTerm: string | null;

     constructor(query: UserQuery) {
         super(query);
         this.searchLoginTerm = query.searchLoginTerm || null;
         this.searchEmailTerm = query.searchEmailTerm || null;

     }




 }