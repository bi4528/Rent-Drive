import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router'

import { OgrodjeComponent } from '../../skupno/komponente/ogrodje/ogrodje.component';
import { HomeComponent } from '../../skupno/komponente/home/home.component';

const poti: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(poti)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
