import { Component, OnInit } from '@angular/core';

import { RssFeed } from '@models/rssFeed/rssFeed';

import { RssFeedService } from '@services/rss-feed/rss-feed.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  rssFeeds: RssFeed[] = [];

  constructor(private rssFeedService: RssFeedService) { }

  ngOnInit() {
    this.getRssFeeds();
  }

  getRssFeeds(): void {
    this.rssFeedService.getRssFeeds().subscribe((rssFeeds) => {
      this.rssFeeds = rssFeeds.slice(1, 5);
    });
  }

}
