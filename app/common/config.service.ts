import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Observer } from 'rxjs/Rx';

@Injectable()
export class ConfigService {
	private _valorConfig: ValorConfig = null;

	constructor(private http: Http) { }

	public obtener(nombre: string): any {
		if (this._valorConfig == null)
			throw "No ha cargado la configuración";
		return this._valorConfig[nombre];
	}

	public cargando(): Promise<any> {
		return this.http.get('config/main.json')
			.map(r => r.json())
			.toPromise();
	}
}

export interface ValorConfig {
	[modulo: string] : string
}