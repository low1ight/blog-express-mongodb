
export type BaseQuery = {
    pageNumber?:string
    pageSize?:string
    sortDirection?:string
    sortBy?:string

}



export class BaseQueryMapper {

    pageNumber:number;
    pageSize:number;
    sortDirection:string;
    sortBy:string;




    constructor({pageNumber,pageSize,sortDirection,sortBy}:BaseQuery) {
        this.pageNumber = Number(pageNumber) || 1
        this.pageSize = Number(pageSize) || 10
        this.sortDirection = sortDirection === 'asc' ? 'asc' : 'desc'
        this.sortBy = sortBy || 'createdAt'


    }



}