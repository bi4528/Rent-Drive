import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../storitve/avtentikacija.service'

@Component({
  selector: 'app-ogrodje',
  templateUrl: './ogrodje.component.html',
  styleUrls: ['./ogrodje.component.css']
})
export class OgrodjeComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService) { }


  public user_logged: boolean = this.authenticationService.is_logged();
  ngOnInit(): void {
  }

}
