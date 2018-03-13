import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsViewerComponent } from '@components/news-viewer/news-viewer.component';
import { RssFeedEditorComponent } from '@components/rss-feed-editor/rss-feed-editor.component';
import { RssFeedsComponent } from '@components/rss-feeds/rss-feeds.component';
import { RssNewsFavoritesComponent } from '@components/rss-news-favorites/rss-news-favorites.component';
import { RssNewsComponent } from '@components/rss-news/rss-news.component';

const routes: Routes = [
  {path: '', redirectTo: '/rssFeeds', pathMatch: 'full'},
  {path: 'rssNews/favorites', component: RssNewsFavoritesComponent},
  {path: 'rssNews/:id', component: NewsViewerComponent},
  {path: 'rssFeed/:id/news', component: RssNewsComponent},
  {path: 'rssFeed/:id', component: RssFeedEditorComponent},
  {path: 'rssFeeds', component: RssFeedsComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
