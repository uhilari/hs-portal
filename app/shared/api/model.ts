import { Observable } from 'rxjs/Rx';
import { RequestMethod } from '@angular/http';
import { Model, ReqService } from './api.config';

export class ModelClass implements Model {
	constructor(private reqSvc: ReqService, private id: string, private data: any){ }

	get Id(): string { return this.id; }
	get Data(): any { return this.data; }

	save(): Observable<void>{
		if (this.id){
			return this.reqSvc.request<void>('/md/' + this.id, RequestMethod.Put);
		}
		return this.reqSvc.request<void>('/nv', RequestMethod.Post);
	}

	delete(): Observable<void> {
		return this.reqSvc.request<void>('/rm/' + this.id, RequestMethod.Delete);
	}
}