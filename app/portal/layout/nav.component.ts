import { Inject, Component, OnInit } from '@angular/core';
import { NAV_SERVICE, NavService } from '../portal.config';

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

	constructor(@Inject(NAV_SERVICE) private service: NavService) {}

	ngOnInit() {
		this.service.list(1)
			.subscribe(itms => {
				this.items = itms;
			});
	}
}