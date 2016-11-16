import { NgModule, ModuleWithProviders } from '@angular/core';
import { ApiConfigs, API_CONFIG } from './api/api.config';

@NgModule({
	
})
export class SharedModule{
	static forApi(cfgs: ApiConfigs): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: [
				{ provide: API_CONFIG, multi: true, useValue: cfgs }
			]
		}
	}
}