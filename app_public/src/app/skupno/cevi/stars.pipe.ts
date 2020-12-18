import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'stars'
})
export class StarsPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(number: Number): string {
    let rez="";
    var j = 1;
    while (j<=number){
        rez+="<i class='fas fa-star'></i>";
        j++;
    }
    if (j-1!=number && number!=null) {
        rez+="<i class='fas fa-star-half-alt'></i>";
        for(var i=j+1;i<=5;i++) 
            rez+="<i class='far fa-star'></i>";
    } else {
        for(var i=j;i<=5;i++) 
            rez+="<i class='far fa-star'></i>";
    }
    if(number!=null){
        rez+="("+number.toFixed(2)+")"
    }
    return rez;
  }

}
