import { Observable } from 'rxjs/Rx';
import { OpaqueToken } from '@angular/core';

export interface ApiConfig {
	url: string;
}

export interface ApiConfigs {
	[nombre: string]: ApiConfig
}

export const API_CONFIG = OpaqueToken;

export interface Model {
	save(): Observable<void>;
	delete(): Observable<void>;
}