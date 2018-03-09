// Components
import { AppComponent } from '@components/app/app.component';
import { NewsViewerComponent } from '@components/news-viewer/news-viewer.component';
import { RssFeedEditorComponent } from '@components/rss-feed-editor/rss-feed-editor.component';
import { RssFeedsComponent } from '@components/rss-feeds/rss-feeds.component';
import { RssNewsComponent } from '@components/rss-news/rss-news.component';

// Directives
import { WebviewDirective } from '@directives/webview/webview.directive';

// Modules
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@modules/app-routing.module';
import { MaterialModule } from '@modules/material.module';

// Services
import { ErrorHandlerService } from '@services/error-handler/error-handler.service';
import { LoggerService } from '@services/logger/logger.service';
import { RssFeedService } from '@services/rss-feed/rss-feed.service';
import { RssNewsService } from '@services/rss-news/rss-news.service';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    RssFeedEditorComponent,
    RssFeedsComponent,
    RssNewsComponent,
    NewsViewerComponent,
    WebviewDirective
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
    ErrorHandlerService,
    LoggerService,
    RssFeedService,
    RssNewsService
  ]
})

export class AppModule { }
