import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RssFeedsComponent } from './rss-feeds/rss-feeds.component';


@NgModule({
  declarations: [
    AppComponent,
    RssFeedsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
