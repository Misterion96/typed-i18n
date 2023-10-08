import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TypedTranslocoModule } from 'typed-transloco';
import { ActionsShowcaseComponent } from 'ui-actions';
import { LayoutsShowcaseComponent } from 'ui-layouts';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ActionsShowcaseComponent,
    LayoutsShowcaseComponent,
    TypedTranslocoModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
