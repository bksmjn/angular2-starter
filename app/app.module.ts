/**
 * Created by Franz on 3/6/2017
 */

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
//import {routing} from './components/routes/[pathToRoutes].routes';
import {AppComponent} from './app.component';
@NgModule(({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
//    routing
  ],
  declarations: [
    AppComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
}))
export class AppModule {
}
