import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LAYOUT_DIRECTIVES } from './layout/layout.config';
import { PORTAL_ROUTES } from './portal.routes';
import { NAV_SERVICE } from './portal.config';
import { SharedModule, makeApiService } from '../shared/index';

@NgModule({
	imports: [ HttpModule, BrowserModule, RouterModule, SharedModule, PORTAL_ROUTES ],
	declarations: [ LAYOUT_DIRECTIVES, InicioComponent ],
	providers: [
		{ provide: NAV_SERVICE, useClass: makeApiService('menu') }
	],
	exports: [ InicioComponent, LAYOUT_DIRECTIVES ]
})
export class PortalModule {

}