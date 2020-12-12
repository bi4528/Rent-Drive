import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { OgrodjeComponent } from './skupno/komponente/ogrodje/ogrodje.component';

@NgModule({
  declarations: [
    OgrodjeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [OgrodjeComponent]
})
export class AppModule { }
