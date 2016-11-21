import { TestBed, inject } from '@angular/core/testing';
import { UrlService } from './url.service';

describe('Url Service', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [UrlService]
		});
	});
	it('creado', inject([UrlService], (svc: UrlService) => {
		expect(svc).toBeDefined();
	}));
	describe('render', () => {
		let svc: UrlService;
		beforeEach(inject([UrlService], (urlSvc: UrlService) => {
			svc = urlSvc;
		}));
		it('Url sin parametros', () => {
			let url = svc.render('/nv');
			expect(url).toBe('/nv');
		});
		it('Url sin \'/\'', () => {
			let url = svc.render('nv');
			expect(url).toBe('/nv');
		});
		it('Con parametros de objeto', () => {
			let url = svc.render('/un/{id}/pg/{pag}', { id: 'AADDEE', pag: 2 });
			expect(url).toBe('/un/AADDEE/pg/2');
		});
		it('Con parametors de objetos no cambiados', () => {
			expect(() => svc.render('/un/{id}/pg/{pg}', { oid: 2 }))
				.toThrowError("No se han podido cambiar los campos: {id},{pg}");
		});
		it('Con parametros de objetos, sin objeto', () => {
			expect(() => svc.render('/un/{id}/'))
				.toThrowError("No se han podido cambiar los campos: {id}");			
		});
		it('Con parametros de args', () => {
			let url = svc.render('/lt/[0]/tx/[1]', {}, [2, 'cod']);
			expect(url).toBe('/lt/2/tx/cod');
		});
		it('Con parametros de args no cambiados', () => {
			expect(() => svc.render('/un/[0]/pg/[1]', {}, [2]))
				.toThrowError("No se han podido cambiar los campos: [1]");
		});
	});
})