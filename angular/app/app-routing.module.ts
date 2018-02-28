import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RssFeedEditorComponent } from './rss-feed-editor/rss-feed-editor.component';
import { RssFeedsComponent } from './rss-feeds/rss-feeds.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'rssFeed/:id', component: RssFeedEditorComponent},
  {path: 'rssFeeds', component: RssFeedsComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
