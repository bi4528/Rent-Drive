import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser'

@Pipe({
  name: 'simplePipe'
})

export class SimplePipePipe implements PipeTransform {
  constructor(private sanitizer:DomSanitizer){}
  transform(value: string): SafeHtml {
    console.log("VALUE simplepipe " + value);
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
