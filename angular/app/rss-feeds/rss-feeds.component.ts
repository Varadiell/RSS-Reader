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

  addRssFeed(url: string): void {
    url = url.trim();
    if (!url) { return; }
    this.rssFeedService.addRssFeed({url} as RssFeed)
    .subscribe((rssFeed) => this.rssFeeds.push(rssFeed));
  }

  deleteRssFeed(rssFeed: RssFeed): void {
    this.rssFeeds = this.rssFeeds.filter((itemRssFeed) => itemRssFeed !== rssFeed);
    this.rssFeedService.deleteRssFeed(rssFeed).subscribe();
  }

  getRssFeeds(): void {
    this.rssFeedService.getRssFeeds().subscribe((rssFeeds) => this.rssFeeds = rssFeeds);
  }

}
