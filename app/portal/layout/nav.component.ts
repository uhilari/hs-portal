import { Component, OnInit } from '@angular/core';
import { NavService } from './nav.service';

@Component({
	selector: 'hs-portal-nav',
	template: `
  <div class="mdl-layout__drawer">
    <nav class="mdl-navigation">
      <a class="mdl-navigation__link" *ngFor="let itm of items" href="">{{ itm.texto }}</a>
    </nav>
  </div>
	`
})
export class NavComponent implements OnInit{
	items: any[] = [];

	constructor(private service: NavService) {}

	ngOnInit() {
		this.service.obtenerItems()
			.subscribe(itms => {
				this.items = itms;
			});
	}
}