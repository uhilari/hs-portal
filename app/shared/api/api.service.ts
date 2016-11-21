import { Observable, Observer } from 'rxjs/Rx';
import { Type, Injectable, Inject } from '@angular/core';
import { Http, RequestMethod, RequestOptions } from '@angular/http';
import { ApiConfig, ApiConfigs, API_CONFIG, Model, Accion, ReqService } from './api.config';
import { UrlService } from './url.service';
import { ModelClass } from './model';

export interface ApiService {
	get(id?: string): Observable<Model>;
	delete(id: string): Observable<void>;
	list(pagina: number): Observable<any[]>;
}

export function makeApiService(nombre: string): Type<ApiService> {
	@Injectable()
	class ApiServiceClass implements ApiService, ReqService {
		private _config: ApiConfig = null;

		constructor(private http: Http, urlSvc: UrlService, @Inject(API_CONFIG) apiCfgs: ApiConfigs[]){
			apiCfgs.forEach((cfg: ApiConfigs) => {
				if (cfg.hasOwnProperty(nombre)){
					this._config = cfg[nombre];
				}
			});
			if(this._config == null)
				throw "No existe configuracion para '" + nombre + "'";
			agregarAcciones(this, urlSvc, filtraAcciones(this._config.acciones, a => a.estatico), this);
		}

		request<T>(url: string, metodo: RequestMethod): Observable<T>{
			let bUrl = this._config.url + url;
			let reqOpts = {
				method: metodo
			};
			return this.http.request(bUrl, reqOpts)
				.map(r => r.json());
		}

		list(pagina: number): Observable<any[]>{
			let url = '/lt/' + pagina;
			return this.request<any[]>(url, RequestMethod.Get);
		}

		get(id?: string): Observable<Model> {
			let url = '';
			if (id)
				url = '/un/' + id;
			else
				url = '/mk';
			return this.request<any>(url, RequestMethod.Get)
				.map<Model>(data => new ModelClass(this, id, data));
		}

		delete(id: string): Observable<void> {
			let url = '/rm/' + id;
			return this.request<void>(url, RequestMethod.Delete);
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

function agregarAcciones(obj: ApiService, urlSvc: UrlService, acciones: Accion[], rq: ReqService){
	acciones.forEach(a => {
		obj[a.nombre] = (...args: any[]) => { 
			let url = urlSvc.render(a.url, obj, args);
			return rq.request(url, a.metodo);
		};
	});
}