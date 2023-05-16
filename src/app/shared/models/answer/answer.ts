export class Answer {
    id: string;
    content: string;
    likesCount: number;
    disLikesCount: number;
    isBestSolution: boolean;
    reaction: number;
    answeredOn: Date;
    answeredBy: string;
    answeredUserName: string;
    answeredUserProfileImageUrl: string;

    constructor(args: any) {
        this.id = args.id;
        this.content = args.content,
        this.likesCount = args.likesCount,
        this.disLikesCount = args.disLikesCount,
        this.isBestSolution =  args.isBestSolution,
        this.reaction = args.reaction;
        this.answeredOn = args.answeredOn;
        this.answeredBy = args.answeredBy;
        this.answeredUserName =  args.answeredUserName,
        this.answeredUserProfileImageUrl = args.answeredUserProfileImageUrl
    }
}