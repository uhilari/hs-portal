import { HeaderComponent } from './header.component';

import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By }           from '@angular/platform-browser';

describe('LayoutComponent', () =>{
	let fixture: ComponentFixture<HeaderComponent>;
	let comp: HeaderComponent;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ HeaderComponent ]
		});
	});
	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		comp = fixture.componentInstance;
	});
	it('Creado', () => expect(comp).toBeDefined());
	describe('render', () => {
		it('title', () => {
			let de = fixture.debugElement.query(By.css('.mdl-layout-title'));
			fixture.detectChanges();
			expect(de.nativeElement.innerHTML).toBe('Titulo');
		})
	});
});