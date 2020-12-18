import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simplePipe'
})
export class SimplePipePipe implements PipeTransform {

  transform(value: string): string {
    console.log("VALUE simplepipe " + value);
    return value;
  }

}
