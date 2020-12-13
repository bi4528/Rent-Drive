import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router'

import { OgrodjeComponent } from '../../skupno/komponente/ogrodje/ogrodje.component';
import { HomeComponent } from '../../skupno/komponente/home/home.component';
import { SearchComponent } from '../../skupno/komponente/search/search.component';
import { PublishComponent} from '../../skupno/komponente/publish/publish.component';

const poti: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'vehicles/publish',
    component: PublishComponent
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
