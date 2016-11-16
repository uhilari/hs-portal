import { Observable } from 'rxjs/Rx';
import { Type, Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ApiConfig, ApiConfigs, API_CONFIG, Model } from './api.config';

export interface ApiService {
	get(id?: string): Observable<Model>;
	list(pagina: number): Observable<any[]>;
}

export function makeApiService(nombre: string): Type<ApiService> {
	@Injectable()
	class ApiServiceClass implements ApiService {
		private _config: ApiConfig = null;

		constructor(private http: Http, @Inject(API_CONFIG) apiCfgs: ApiConfigs[]){
			apiCfgs.forEach((cfg: ApiConfigs) => {
				if (cfg.hasOwnProperty(nombre)){
					this._config = cfg[nombre];
				}
			});
		}

		list(pagina: number): Observable<any[]>{
			return this.http.get(this._config.url + '/lt/' + pagina)
				.map(r => r.json());
		}

		get(id?: string): Observable<Model> {
			let url = this._config.url;
			if (id)
				url += '/un/' + id;
			else
				url += '/mk';

			return this.http.get(url)
				.map(r => r.json());
		}
	}

	return ApiServiceClass;
}
