import { LayoutComponent } from './layout.component';

import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('LayoutComponent', () =>{
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ RouterTestingModule ],
			declarations: [ LayoutComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
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