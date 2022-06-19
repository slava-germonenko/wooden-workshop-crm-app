import { DatePipe } from '@angular/common';

const dateTimePipe = new DatePipe('ru');

export function toLocalDateTime(value: Date): Date {
  let stringRepresentation = value.toString();
  if (!stringRepresentation.endsWith('Z')) {
    stringRepresentation = `${stringRepresentation}Z`;
  }
  return new Date(stringRepresentation);
}

export function dateTimeFormatter(value: Date): string | null {
  return dateTimePipe.transform(value, 'medium');
}

export function dateOnlyFormatter(value: Date): string | null {
  return dateTimePipe.transform(value, 'mediumDate');
}

export function timeTimeFormatter(value: Date): string | null {
  return dateTimePipe.transform(value, 'mediumTime');
}
