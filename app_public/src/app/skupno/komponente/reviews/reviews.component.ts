import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input() reviews: any;
  @Input() vehicleId: any;


  constructor() { }

  public rezultat: any;
  ngOnInit(): void {
    /*let rezultat = "";
    if (this.vsebina != null) {
      for (var i = 0; i < this.vsebina.length; i++) {
        rezultat += "<tr class='review'><td class='profile' colspan='2'>";
        rezultat += "<img class='avatar' onclick=\"location.href='/users/profiles/" + this.vsebina[i].user_id + "'\"  src = '../../../../assets/uploads/" + this.vsebina[i].img + "' > ";
        rezultat += "<strong>" + this.vsebina[i].username + "</strong></td>";
        rezultat += "<td class='stars'><span>" + this.vsebina[i].rating + "</span></td>";
        rezultat += "<td class='comment'>" + this.vsebina[i].comment + "</td>"
        rezultat += "<td>";
        if (this.vsebina[i].show_delete_button == true) {
          rezultat += "<input type='button' class = 'btn btn-danger delete' value = 'Delete' onclick = \"location.href='/vehicles/" + this.vehicleId + "/reviews/" + this.vsebina[i]._id + "/delete'\" owner='" + this.vsebina[i].username + "' ></input>";
        }
        rezultat += "</td>"; //hidden='true';
      }
      rezultat += "</tr>";
    }
    debugger;
    
    this.rezultat = rezultat;*/
  }

}
