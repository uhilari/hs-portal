import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PortalModule } from './portal/portal.module';
import { SharedModule } from './shared/index';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, SharedModule, PortalModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
