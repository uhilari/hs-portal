import { Observable } from 'rxjs/Rx';
import { Type, Injectable, Inject } from '@angular/core';
import { Http, RequestMethod, RequestOptions } from '@angular/http';
import { ApiConfig, ApiConfigs, API_CONFIG, Model, Accion } from './api.config';

export interface ApiService {
	get(id?: string): Observable<Model>;
	list(pagina: number): Observable<any[]>;
}

interface ReqService{
	request<T>(url: string, metodo: RequestMethod): Observable<T>;
}

export function makeApiService(nombre: string): Type<ApiService> {
	@Injectable()
	class ApiServiceClass implements ApiService, ReqService {
		private _config: ApiConfig = null;

		constructor(private http: Http, @Inject(API_CONFIG) apiCfgs: ApiConfigs[]){
			apiCfgs.forEach((cfg: ApiConfigs) => {
				if (cfg.hasOwnProperty(nombre)){
					this._config = cfg[nombre];
				}
			});
			if(this._config == null)
				throw "No existe configuracion para '" + nombre + "'";
			agregarAcciones(this, filtraAcciones(this._config.acciones, a => a.estatico), this);
		}

		request<T>(url: string, metodo: RequestMethod): Observable<T>{
			let reqOpts = {
				method: metodo
			};
			return this.http.request(url, reqOpts)
				.map(r => r.json());
		}

		list(pagina: number): Observable<any[]>{
			let url = this._config.url + '/lt/' + pagina;
			return this.request<any[]>(url, RequestMethod.Get);
		}

		get(id?: string): Observable<Model> {
			let url = this._config.url;
			if (id)
				url += '/un/' + id;
			else
				url += '/mk';

			return this.request<Model>(url, RequestMethod.Get);
		}
	}

	return ApiServiceClass;
}

function filtraAcciones(acciones: Accion[], fnc: (a: Accion) => boolean) {
	let lista: Accion[] = [];
	if (acciones) {
		acciones.forEach(a => {
			if (fnc(a))
				lista.push(a);
		});
	}
	return lista;
}

function agregarAcciones(obj: ApiService, acciones: Accion[], rq: ReqService){
	acciones.forEach(a => {
		obj[a.nombre] = (args?: any) => { 
			let params = args || {};
			let url = a.url;
			for(let s in params){
				url = url.replace('{' + s + '}', params[s]);
			}
			return rq.request(url, a.metodo);
		};
	});
}