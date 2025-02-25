import { Pipe, PipeTransform } from '@angular/core';
import en from '../translate/en.json' ;

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(value: string, ...args: string[]): any {
    value= value.toString();
    if(!value) return value;
    if (value in en) {
      return en[value as keyof typeof en];
    }
  }

}
