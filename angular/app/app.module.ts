// Components
import { AppComponent } from '@components/app/app.component';
import { NewsViewerComponent } from '@components/news-viewer/news-viewer.component';
import { RssFeedEditorComponent } from '@components/rss-feed-editor/rss-feed-editor.component';
import { RssFeedsComponent } from '@components/rss-feeds/rss-feeds.component';
import { RssNewsComponent } from '@components/rss-news/rss-news.component';

// Modules
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@modules/app-routing/app-routing.module';
import { MaterialModule } from '@modules/material/material.module';

// Services
import { LoggerService } from '@services/logger/logger.service';
import { RssFeedService } from '@services/rss-feed/rss-feed.service';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    RssFeedEditorComponent,
    RssFeedsComponent,
    RssNewsComponent,
    NewsViewerComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    LoggerService,
    RssFeedService
  ]
})

export class AppModule { }
