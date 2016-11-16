import { ApiConfigs } from './api.config';
import { ApiService, makeApiService } from './api.service';
import { SharedModule } from '../shared.module';

import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ApiService', () => {
	const SampleApi = makeApiService('sample');
	beforeEach(() => {

		TestBed.configureTestingModule({
			imports: [ HttpModule, SharedModule.forApi({ sample: { url: '/api/sample' } }) ],
			providers: [SampleApi]
		});
	});
	it('Creado', () => {
		let svc = TestBed.get(SampleApi);
		expect(svc).toBeDefined();
	});
});