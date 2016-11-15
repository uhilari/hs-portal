import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ConfigService, ValorConfig } from './config.service';

describe('ConfigService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ 
				ConfigService,
				MockBackend,
				BaseRequestOptions,
				{ 
					provide: Http, 
					useFactory: (b: MockBackend, o: BaseRequestOptions) => new Http(b, o), 
					deps: [ MockBackend, BaseRequestOptions ] 
				}
			],
			imports: [ HttpModule ]
		});
	});

	it('Creado', inject([ ConfigService ], (configSvc: ConfigService) => {
		expect(configSvc).toBeDefined();
	}));

	describe('obtener en mem', () => {
		let cfgSvc: ConfigService;
		beforeEach(inject([ ConfigService ], (configSvc: ConfigService) => {
			cfgSvc = configSvc;
			cfgSvc['_valorConfig'] = {
				titulo: 'HsPortal'
			};
		}));
		it('existe valor', () => {
			cfgSvc.obtener('titulo')
				.then((titulo) => {
					expect(titulo).toBe('HsPortal');
				});
		});
		it('no existe el valor', () => {
			cfgSvc.obtener('nombre')
				.then(() => {
					fail('debe lanzar un error');
				})
				.catch((reason) => {
					expect(reason).toBe("El módulo no tiene una configuración");
				});
		});
	});

	describe('obtener no en memory', () => {
		let cfgSvc: ConfigService;
		let mock: MockBackend;
		let config: ValorConfig;
		beforeEach(inject([ ConfigService, MockBackend ], (configSvc: ConfigService, mockBackend: MockBackend) => {
			cfgSvc = configSvc;
			mock = mockBackend;
			config = { titulo: 'HS Portal' };
		}));
		it('existe valor', () => {
			mock.connections.subscribe((conn: MockConnection) => {
				conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(config) })));
			});
			cfgSvc.obtener('titulo')
				.then((titulo) => {
					expect(titulo).toBe('HsPortal');
				});
		});
		it('no existe archivo', () => {
			mock.connections.subscribe((conn: MockConnection) => {
				conn.mockError(new Error('Not Found'));
			});
			cfgSvc.obtener('titulo')
				.then(() => {
					fail('debe lanzar un error');
				})
				.catch((reason) => {
					expect(reason).toBe("No existe el archivo de configuración");
				});
		});
	});
});