import { NgModule, ModuleWithProviders } from '@angular/core';
import { ApiConfigs, API_CONFIG, configDefault } from './api/api.config';
import { UrlService } from './api/url.service';

@NgModule({
	providers: [ UrlService ]
})
export class SharedModule{
	static forApi(cfgs: ApiConfigs): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: [
				{ provide: API_CONFIG, multi: true, useValue: configDefault(cfgs) }
			]
		}
	}
}