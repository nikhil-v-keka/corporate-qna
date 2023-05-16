export class NewQuestion{
    title:string;
    description: string;
    categoryId : string;

    constructor(args: any) {
        this.title = args.title;
        this.description = args.description;
        this.categoryId = args.categoryId;
    }
}