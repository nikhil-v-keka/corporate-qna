export class User {
    id: string;
    name: string;
    designation: string;
    department: string;
    location: string;
    likesCount: number;
    dislikesCount: number;
    questionsAskedCount: number;
    questionsAnsweredCount: number;
    questionsSolvedCount: number;
    profileImageUrl: string;

    constructor(
        args: any
    ) {
        this.id = args.id;
        this.name = args.name;
        this.designation = args.designation;
        this.department = args.department;
        this.location = args.location;
        this.likesCount = args.likesCount;
        this.dislikesCount = args.dislikesCount;
        this.questionsAskedCount = args.questionsAskedCount;
        this.questionsAnsweredCount = args.questionsAnsweredCount;
        this.questionsSolvedCount = args.questionsSolvedCount;
        this.profileImageUrl = args.profileImageUrl;
    }
}