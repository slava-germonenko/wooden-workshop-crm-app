import { Pipe, PipeTransform } from '@angular/core';
import { Person } from '@framework/full-name/person';

@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  public transform({ firstName, lastName }: Person): string {
    return `${firstName} ${lastName}`;
  }
}
