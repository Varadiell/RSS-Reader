import { Component, OnInit } from '@angular/core';
import { RssFeed } from '../rssFeed';

import { RssFeedService } from '../rss-feed.service';

@Component({
  selector: 'app-rss-feeds',
  templateUrl: './rss-feeds.component.html',
  styleUrls: ['./rss-feeds.component.css']
})
export class RssFeedsComponent implements OnInit {

  rssFeeds: RssFeed[];

  constructor(private rssFeedService: RssFeedService) { }

  ngOnInit() {
    this.getRssFeeds();
  }

  getRssFeeds(): void {
    this.rssFeedService.getRssFeeds().subscribe((rssFeeds) => this.rssFeeds = rssFeeds);
  }

}
