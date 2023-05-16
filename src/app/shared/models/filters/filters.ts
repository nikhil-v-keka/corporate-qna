export class Filters {
    categoryId : string;
    userId : string;
    isResolved : boolean;
    isMyParticipation : boolean;
    isMostViewed : boolean;
    days : number;

    constructor(args: any){
        this.categoryId = args.categoryId;
        this.userId = args.userId;
        this.isResolved = args.isResolved;
        this.isMyParticipation = args.isMyParticipation
        this.isMostViewed = args.isMostViewed;
        this.days = args.days;
    }
}