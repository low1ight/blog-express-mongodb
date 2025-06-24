
export type BaseQuery = {
    pageNumber?:string
    pageSize?:string

}

export class BaseQueryMapper {

    pageNumber:number;
    pageSize:number;




    constructor({pageNumber,pageSize}:BaseQuery) {
        this.pageNumber = Number(pageNumber) || 1
        this.pageSize = Number(pageSize) || 10

    }



}