// Modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RssFeedEditorComponent } from './rss-feed-editor/rss-feed-editor.component';
import { RssFeedsComponent } from './rss-feeds/rss-feeds.component';

// Services
import { RssFeedService } from './rss-feed.service';

@NgModule({
  declarations: [
    AppComponent,
    RssFeedsComponent,
    RssFeedEditorComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    RssFeedService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
