import { LayoutComponent } from './layout.component';

import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LayoutComponent', () =>{
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ RouterTestingModule ],
			declarations: [ LayoutComponent ]
		});
	});
	it('Creado', inject([], () => {
		TestBed.compileComponents().then(() => {
			let fixture = TestBed.createComponent(LayoutComponent);
			let comp = fixture.componentInstance;
			expect(comp).toBeDefined() 
		});
	}));
});