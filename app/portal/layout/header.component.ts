import { Component } from '@angular/core';

@Component({
	selector: 'hs-portal-header',
	template: `
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <span class="mdl-layout-title">{{ title }}</span>
      <div class="mdl-layout-spacer"></div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="txt-busqueda">
          <i class="material-icons">search</i>
        </label>
        <div class="mdl-textfield__expandable-holder">
          <input class="mdl-textfield__input" type="text" name="sample" id="txt-busqueda">
        </div>
      </div>
    </div>
  </header>
	`
})
export class HeaderComponent{
	title: string = "Titulo";
}