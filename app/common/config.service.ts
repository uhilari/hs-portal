import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Observer } from 'rxjs/Rx';

@Injectable()
export class ConfigService {
	private _valorConfig: ValorConfig = null;

	constructor(private http: Http) { }

	private processPromise(nombre: string, res: (value?: any) => void, rej:(reason?: any) => void) {
		if(this._valorConfig.hasOwnProperty(nombre)){
			res(this._valorConfig[nombre]);
		}
		else {
			rej("El módulo no tiene una configuración");
		}
	}

	public obtener(nombre: string): Promise<any> {
		return new Promise((res: (value?: any) => void, rej: (reason?: any) => void) => {
			if (this._valorConfig == null) {
				this.http.get('config/main.json')
					.map(r => r.json())
					.subscribe((data) => {
						this._valorConfig = data;
						this.processPromise(nombre, res, rej);
					}, () => {
						rej("No existe el archivo de configuración");
					});
			} 
			else {
				this.processPromise(nombre, res, rej);
			}
		});
	}
}

export interface ValorConfig {
	[modulo: string] : string
}