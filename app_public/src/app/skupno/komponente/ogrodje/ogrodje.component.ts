import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../storitve/avtentikacija.service'

@Component({
  selector: 'app-ogrodje',
  templateUrl: './ogrodje.component.html',
  styleUrls: ['./ogrodje.component.css']
})
export class OgrodjeComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService) { }


  public user_logged: boolean;
  public user_id: string;

  ngOnInit(): void {
    this.user_logged = this.authenticationService.is_logged();
    console.log(this.user_logged);
    if(this.user_logged) {
      this.user_id = this.authenticationService.get_current_user()._id;
    }
  }

}
