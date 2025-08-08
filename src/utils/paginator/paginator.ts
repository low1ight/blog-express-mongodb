
export class Paginator<T> {

    pageCount:number;
    page:number;
    pageSize:number;
    totalCount:number;
    items:T[]

    constructor(page:number, pageSize:number, totalItemCount:number,items:T[]) {

        this.pageCount = Math.ceil(totalItemCount / pageSize)
        this.page = page
        this.pageSize = pageSize
        this.totalCount = totalItemCount
        this.items = items




    }




}