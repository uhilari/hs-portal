import { InicioComponent } from './inicio.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';

describe('InicioComponent', () => {
	let fixture: ComponentFixture<InicioComponent>;
	let comp : InicioComponent;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ InicioComponent ]
		});
	});
	beforeEach(() => {
		fixture = TestBed.createComponent(InicioComponent);
		comp = fixture.componentInstance;
	});
	it('Creado', () => expect(comp).toBeDefined());
});