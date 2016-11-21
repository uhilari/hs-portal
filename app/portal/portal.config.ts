import { OpaqueToken } from '@angular/core';
import { ApiConfigs, ApiService, SharedModule } from '../shared/index';

export const NAV_SERVICE = new OpaqueToken('NavService');

export interface NavService extends ApiService {
}

const baseUrl = 'http://localhost:14001';
const PortalApiConfig: ApiConfigs = {
	menu: {
		url : baseUrl + '/menu',
		acciones: [
			{ nombre: 'raices', url: '/rz' }
		]
	}
}

export const PortalApi = SharedModule.forApi(PortalApiConfig);
