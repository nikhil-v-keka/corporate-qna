import { VoteStatus } from "../../enums/vote.enums";

export class QuestionReaction {
    reaction: VoteStatus

    constructor(reaction: VoteStatus) {
        this.reaction = reaction;
    }
}