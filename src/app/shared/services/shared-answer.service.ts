import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { LikeStatus } from '../enums/like.enum';
import { VoteStatus } from '../enums/vote.enums';

@Injectable({
  providedIn: 'root'
})
export class SharedAnswerService {
  private textAreaValue = new BehaviorSubject<string>('');
  
  constructor() { }

  getTextValue() {
    return this.textAreaValue.asObservable();
  }

  setTextValue(data: string){
    this.textAreaValue.next(data);
  }

  updateReaction(reaction: any, type: VoteStatus | LikeStatus) {
    if (reaction.reaction === type) {
      if (type === VoteStatus.Upvote || type === LikeStatus.Like) {
        reaction.upvotesCount--;
        reaction.likesCount--;
        reaction.reaction = VoteStatus.None;
      } else {
        reaction.downvotesCount--;
        reaction.disLikesCount--;
        reaction.reaction = VoteStatus.None;
        reaction.reaction = LikeStatus.None;
      }
    } else {
      if (reaction.reaction === VoteStatus.None) {
        if (type === VoteStatus.Upvote || type === LikeStatus.Like) {
          reaction.upvotesCount++;
          reaction.likesCount++
          reaction.reaction = type;
        } else {
          reaction.disLikesCount++;
          reaction.downvotesCount++;
          reaction.reaction = type;
        }
      } else {
        if (type === VoteStatus.Upvote || type === LikeStatus.Like) {
          reaction.upvotesCount++;
          reaction.downvotesCount--;
          reaction.likesCount++;
          reaction.disLikesCount--;
          reaction.reaction = type;
        } else {
          reaction.downvotesCount++;
          reaction.disLikesCount++;
          reaction.likesCount--;
          reaction.upvotesCount--;
          reaction.reaction = type;
        }
      }
    }
  }
}
