import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ogrodje',
  templateUrl: './ogrodje.component.html',
  styleUrls: ['./ogrodje.component.css']
})
export class OgrodjeComponent implements OnInit {

  constructor() { }
  public user_logged: boolean = true; //TODO
  ngOnInit(): void {
  }

}
