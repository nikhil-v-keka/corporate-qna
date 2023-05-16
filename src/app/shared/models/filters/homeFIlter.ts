export class HomeFilter {
    categoryId:string;
    showFilter : string;
    sortFilter : string;
     
    constructor(args:any) {
    this.categoryId = args.categoryId;
    this.showFilter = args.showFilter;
    this.sortFilter = args.sortFilter;
    }
}