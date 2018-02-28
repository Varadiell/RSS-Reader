// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RssFeedEditorComponent } from './rss-feed-editor/rss-feed-editor.component';
import { RssFeedsComponent } from './rss-feeds/rss-feeds.component';

// Modules
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Services
import { RssFeedService } from './rss-feed.service';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    RssFeedEditorComponent,
    RssFeedsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    RssFeedService
  ]
})

export class AppModule { }
