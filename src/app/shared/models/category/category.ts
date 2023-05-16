export class Category {
    name: string;
    description?: string;
    id: string;
    taggedThisWeek?: number;
    taggedThisMonth?: number;
    questionsCount?: number;

    constructor(args: any) {
        this.name = args.name;
        this.description = args.description;
        this.id = args.id;
        this.taggedThisWeek = args.taggedThisWeek;
        this.taggedThisMonth = args.taggedThisMonth;
        this.questionsCount = args.questionsCount;
    }
}
