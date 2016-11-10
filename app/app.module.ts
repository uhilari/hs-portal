import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PortalModule } from './portal/portal.module';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, PortalModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
