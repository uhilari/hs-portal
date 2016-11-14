import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'hs-portal-layout',
	template: `
<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <hs-portal-header></hs-portal-header>
  <hs-portal-nav></hs-portal-nav>
  <main class="mdl-layout__content">
    <div class="page-content">
      <router-outlet></router-outlet>
    </div>
  </main>
</div>
	`
})
export class LayoutComponent implements OnInit{
  ngOnInit(){
  	componentHandler.upgradeAllRegistered();
  }
}