export class Question {
    id: string;
    title: string;
    description: string
    viewsCount: number;
    answersCount: number;
    upvotesCount: number;
    downvotesCount: number;
    voteStatus: number;
    askedOn: Date;
    isResolved: boolean;
    askedBy: string;
    categoryId: string;
    askedUserName: string;
    askedUserProfileImageUrl: string;
    reaction: number;

    constructor(args: any)
     {
        this.id = args.id;
        this.title = args.title;
        this.description = args.description
        this.viewsCount = args.viewsCount;
        this.answersCount = args.answersCount;
        this.upvotesCount = args.upvotesCount;
        this.downvotesCount = args.downvotesCount;
        this.voteStatus = args.voteStatus;
        this.askedOn = args.askedOn;
        this.isResolved = args.isResolved;
        this.askedBy = args.askedBy;
        this.categoryId = args.categoryId;
        this.askedUserName = args.askedUserName;
        this.askedUserProfileImageUrl = args.askedUserProfileImageUrl;
        this.reaction = args.reaction;

    }
}

