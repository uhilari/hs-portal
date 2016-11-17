import { RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { OpaqueToken, Type } from '@angular/core';

export interface ApiConfig {
	url: string;
	acciones?: Accion[];
}

export interface ApiConfigs {
	[nombre: string]: ApiConfig
}

export const API_CONFIG = OpaqueToken;

export interface Model {
	save(): Observable<void>;
	delete(): Observable<void>;
}

export interface Accion{
	nombre: string;
	metodo?: RequestMethod,
	url?: string;
	estatico?: boolean;
}

export function configDefault(cfgs: ApiConfigs): ApiConfigs {
	for(let c in cfgs){
		let cfg = cfgs[c];
		if (cfg.hasOwnProperty('acciones')){
			cfg.acciones.forEach((a) => {
				a.url = cfg.url + a.url;
				if (!a.hasOwnProperty('metodo'))
					a.metodo = RequestMethod.Get;
				if (!a.hasOwnProperty('estatico'))
					a.estatico = false;
			});
		}
	}
	return cfgs;
}