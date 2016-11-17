import { ApiConfigs } from './api.config';
import { ApiService, makeApiService } from './api.service';
import { SharedModule } from '../shared.module';

import { Observable } from 'rxjs/Rx';
import { Http, HttpModule, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

interface ISampleApi extends ApiService {
	porPagina(args: any): Observable<any>;
}

describe('ApiService', () => {
	const SampleApi = makeApiService('sample');
	beforeEach(() => {
		let cfg ={ 
			sample: { 
				url: '/api/sample',
				acciones: [
					{ nombre: 'hijos' },
					{ nombre: 'porPagina', url: '/pg/{numero}', estatico: true }
				]
			} 
		};
		TestBed.configureTestingModule({
			imports: [ HttpModule, SharedModule.forApi(cfg) ],
			providers: [
				SampleApi,
				BaseRequestOptions,
				MockBackend,
				{ provide: Http, useFactory: (b: MockBackend, o: BaseRequestOptions) => new Http(b, o), deps: [ MockBackend, BaseRequestOptions] }
			]
		});
	});
	let svc: ISampleApi;
	beforeEach(() => {
		svc = TestBed.get(SampleApi);
	})
	it('Creado', () => {
		expect(svc).toBeDefined();
	});
	describe('metodos extendidos', () => {
		it('Estatico', () => {
			expect(svc['porPagina']).toBeDefined();
		});
		it('No estatico', () => {
			expect(svc['hijos']).toBeUndefined();
		});
	});
	describe('list', () => {
		it('correcto', inject([MockBackend], (back: MockBackend) => {
			back.connections.subscribe((c: MockConnection) => {
				if (c.request.method == RequestMethod.Get){
					let info = [
						{ codigo: '1' },
						{ codigo: '2' },
						{ codigo: '3' }
					];
					c.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(info)})));
				}
				else {
					c.mockError(new Error('Error de Metodo'));
				}
			});

			svc.list(1).subscribe(data => {
				expect(data.length).toBe(3);
			}, (r: Error) => fail(r.message));
		}));
		it('error code 500', inject([MockBackend], (back: MockBackend) => {
			back.connections.subscribe((c: MockConnection) => {
				c.mockError(new Error('Error de Server'));
			});
			svc.list(1).subscribe(d => fail('debe lanzar un error'), r => expect(r).toBeDefined());
		}));
	});
	describe('porPagina', () => {
		beforeEach(inject([MockBackend], (back: MockBackend) => {
			back.connections.subscribe((c: MockConnection) => {
				if (c.request.method != RequestMethod.Get){
					c.mockError(new Error('Error de Metodo'));
				}
				else if(c.request.url.indexOf('{numero}') > 0){
					c.mockError(new Error('No ha procesado el url'));
				}
				else {
					let info = [
						{ codigo: '1' },
						{ codigo: '2' },
						{ codigo: '3' },
						{ codigo: '4' }
					];
					c.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(info)})));
				}
			});
		}));
		it('correcto', () => { 
			svc.porPagina({ numero: 1 }).subscribe(data => {
				expect(data.length).toBe(4);
			}, (r: Error) => fail(r.message));
		});
		it('error de args', () => {
			svc.porPagina({ pagina: 2}).subscribe(d => fail('Debe lanzar un error'), r => {});
		});
	});
});