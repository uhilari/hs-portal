import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {
	private renderFormat(urlTpl: string): string {
		let url = urlTpl;
		if (url[0] !== '/')
			url = '/' + url;
		return url;
	}

	private reemplazarValor(urlTpl: string, re: RegExp, valores: any, fncEval: (obj: any, indice: any) => boolean) {
		let url = urlTpl;
		let info = url.match(re);
		if (info) {
			let noCambiados: string[] = [];
			info.forEach((val: string) => {
				let campo = val.substring(1, val.length - 1);
				if (fncEval(valores, campo)){
					url = url.replace(val, valores[campo]);
				}
				else {
					noCambiados.push(val);
				}
			});
			if (noCambiados.length > 0) {
				throw new Error("No se han podido cambiar los campos: " + noCambiados.toString());
			}
		}
		return url;		
	}

	private reemplazarCamposDeObjeto(urlTpl: string, obj: any = {}){
		let re = /{\w*}/g;
		return this.reemplazarValor(urlTpl, re, obj, (o: any, campo: string) => o.hasOwnProperty(campo))
	}

	private reemplarArgumentos(urlTpl: string, args: any[] = []) {
		let re = /\[\d+\]/g;
		return this.reemplazarValor(urlTpl, re, args, (a: any[], indice: string) => a.length > parseInt(indice));
	}

	public render(urlTpl: string, obj?: any, args?: any[]): string {
		let url = this.renderFormat(urlTpl);
		url = this.reemplazarCamposDeObjeto(url, obj);
		url = this.reemplarArgumentos(url, args);
		return url;
	}
}