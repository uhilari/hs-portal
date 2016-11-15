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

	describe('obtener', () => {
		let cfgSvc: ConfigService;
		beforeEach(inject([ ConfigService ], (configSvc: ConfigService) => {
			cfgSvc = configSvc;
			cfgSvc['_valorConfig'] = {
				titulo: 'HsPortal'
			};
		}));
		it('existe valor', () => {
			var titulo = cfgSvc.obtener('titulo');
			expect(titulo).toBe('HsPortal');
		});
		it('no existe el valor', () => {
			var nombre = cfgSvc.obtener('nombre');
			expect(nombre).toBeUndefined();
		});
		it('no se ha cargado el config', () => {
			try{
				cfgSvc['_valorConfig'] = null;
				cfgSvc.obtener('nombre');
				fail('Debe lanzar una exception');
			}
			catch(err) {
			}
		});
	});

	describe('cargar', () => {
		let cfgSvc: ConfigService;
		let mock: MockBackend;
		let config: ValorConfig;
		beforeEach(inject([ ConfigService, MockBackend ], (configSvc: ConfigService, mockBackend: MockBackend) => {
			cfgSvc = configSvc;
			mock = mockBackend;
			config = { titulo: 'HS Portal' };
		}));
		it('data cargada', () => {
			mock.connections.subscribe((cn: MockConnection) => {
				cn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(config )})));
			});
			cfgSvc.cargando().then((cfg: any) => {
				expect(cfg.titulo).toBe('HS Portal');
			});
		});
		it('no existe data', () => {
			mock.connections.subscribe((cn: MockConnection) => {
				cn.mockError(new Error("No existe el archivo"));
			});
			cfgSvc.cargando()
				.then(d => fail("Debe lanzar un erro"), r => expect(r).toBeDefined());
		});
	});
});