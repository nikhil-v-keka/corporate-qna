export class Department {
    id: string;
    name: string;

    constructor(
        args: any
    ) {
        this.id = args.id;
        this.name = args.name;
    }
}