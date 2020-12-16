import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../storitve/avtentikacija.service'

@Component({
  selector: 'app-ogrodje',
  templateUrl: './ogrodje.component.html',
  styleUrls: ['./ogrodje.component.css']
})
export class OgrodjeComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService) { }


  public user_id: string;

  public is_user_logged(): boolean {
    return this.authenticationService.is_logged();
  }
  ngOnInit(): void {
    if (this.is_user_logged()) {
      this.user_id = this.authenticationService.get_current_user()._id;
    }
  }

}
