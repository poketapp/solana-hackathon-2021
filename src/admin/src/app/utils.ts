// A file for organizing common utility functions.

import { Pipe, PipeTransform } from '@angular/core';

// REGION - UI STATE CONSTS
export enum ORDERING {
  DEFAULT = 'default',
  ASC = 'asc',
  DESC = 'desc',
}

export enum BUTTON_STATE {
  DISABLED = 'disabled',
  ACTIVE = 'active',
  LOADING = 'loading',
}
// ENDREGION

@Pipe({
  name: 'averageOfTwoNumbers',
})
export class AverageOfTwoNumbersPipe implements PipeTransform {
  transform(a: number, b: number): number {
    if (a === 0) {
      return b;
    } else if (b === 0) {
      return a;
    }
    return (a + b) / 2;
  }
}
