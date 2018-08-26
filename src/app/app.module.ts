import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {XelloToolTipModule} from './XelloToolTip/xello-tool-tip.module';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    XelloToolTipModule //Tool tip module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
