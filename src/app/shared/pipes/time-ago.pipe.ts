import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {

  transform(value: string | Date): string {
    const seconds = Math.floor((new Date().getTime() - new Date(value).getTime()) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    };

    let counter;
    for (const interval in intervals) {
      counter = Math.floor(seconds / intervals[interval]);
      if (counter > 0) {
        if (counter === 1) {
          return counter + ' ' + interval + ' ago';
        } else {
          return counter + ' ' + interval + 's ago';
        }
      }
    }
    return 'just now' ;
  }
}
