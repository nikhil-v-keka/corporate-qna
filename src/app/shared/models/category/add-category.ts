export class AddCategory{
    name: string;
    description: string;

    constructor(args: any){
        this.name = args.name;
        this.description = args.description;
    }
}