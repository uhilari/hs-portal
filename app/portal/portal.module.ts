import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { InicioComponent } from './inicio/inicio.component';
import { PORTAL_ROUTES } from './portal.routes';

@NgModule({
	imports: [RouterModule, PORTAL_ROUTES ],
	declarations: [LayoutComponent, InicioComponent],
	exports: [LayoutComponent]
})
export class PortalModule {

}