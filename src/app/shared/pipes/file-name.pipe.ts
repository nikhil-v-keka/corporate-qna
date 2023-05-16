import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkTransform'
})
export class FileNamePipe implements PipeTransform {
    transform(value: string): string {
    const baseUrl = 'https://cdn.kekastatic.net/shared/branding/logo/';
    return `${baseUrl}${value}`;
  }
}