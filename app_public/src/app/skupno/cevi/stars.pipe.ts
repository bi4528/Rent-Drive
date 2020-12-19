import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'stars'
})
export class StarsPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(number: number): string {
    var wStars = Math.floor(number);
    var halfStars = (wStars < number);  //if Math.floor(num)!=num, need half
    var rez="";
    //Loop through five stars:
    for(let i=1;i<=5;i++){
      if(i<=wStars) 
        rez+="</i><i class='fas fa-star' style='color:#fbcc05'></i>";         //if :le - solid
      
        else if( i==wStars+1 && halfStars==true )
        rez+="<i class='fas fa-star-half-alt' style='color:#fbcc05'></i>";    // if about to finish and halfstar=true - half
      
      else rez+="<i class='far fa-star' style='color:#bfbfbf'></i>";          // else empty star
    }
    return rez;
  }
}
