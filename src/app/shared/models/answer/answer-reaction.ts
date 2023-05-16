import { LikeStatus } from "../../enums/like.enum";

export class AnswerReaction {
    reaction: LikeStatus

    constructor(
        reaction: LikeStatus
    ) {
        this.reaction = reaction;
    }
}