import { NavComponent } from './nav.component';
import { NavService } from './nav.service';

import { Observable, Observer } from 'rxjs/Rx';
import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By }           from '@angular/platform-browser';

describe('NavComponent', () => {
	let fixture: ComponentFixture<NavComponent>;
	let comp: NavComponent;
	let svc: any = {
		obtenerItems: () => Observable.of([
			{ texto: 'Link'},
			{ texto: 'Link'},
			{ texto: 'Link'}
		])
	};
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ NavComponent ],
			providers: [{ provide: NavService, useValue: svc}]
		});
	});
	beforeEach(() => {
		fixture = TestBed.createComponent(NavComponent);
		comp = fixture.componentInstance;
	});
	it('Creado', () => expect(comp).toBeDefined());	
	it('4 Links', () => {
		fixture.detectChanges();
		let itms = fixture.debugElement.query(By.css(".mdl-navigation"));
		expect(itms.children.length).toBe(3);
	});
});