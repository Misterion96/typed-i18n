import { Component } from '@angular/core';
import { TypedTranslocoService } from 'typed-transloco';

@Component({
  selector: 'app-root',
  template: `
    <lib-actions-showcase></lib-actions-showcase>
    <lib-layouts-showcase></lib-layouts-showcase>
    <div>
      <button (click)="onChangeLang('en')">
        EN
      </button>
      <button (click)="onChangeLang('de')">
        DE
      </button>
    </div>
  `,
  styles: [`:host {display: flex; flex-direction: column; gap: 8px}`]
})
export class AppComponent {
  constructor(
      private typedTranslocoService: TypedTranslocoService
  ) {
  }

  public onChangeLang($event: any): void {
    console.log('lang: ', $event)
    this.typedTranslocoService.setActiveLang($event)
  }
}
