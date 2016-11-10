import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'hs-portal-layout',
	templateUrl: 'app/portal/layout/layout.html'
})
export class LayoutComponent implements OnInit{
  ngOnInit(){
  	componentHandler.upgradeAllRegistered();
  }
}