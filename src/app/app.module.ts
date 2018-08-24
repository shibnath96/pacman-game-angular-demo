import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//Services
import { GlobalService } from './services/global.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ GlobalService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
