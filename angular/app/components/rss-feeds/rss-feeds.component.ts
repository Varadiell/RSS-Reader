import { Component, OnInit } from '@angular/core';

import { RssFeed } from '@models/rssFeed';

import { RssFeedService } from '@services/rss-feed/rss-feed.service';

import { MaterialModule } from '@modules/material.module';

@Component({
  selector: 'app-rss-feeds',
  templateUrl: './rss-feeds.component.html',
  styleUrls: ['./rss-feeds.component.css']
})
export class RssFeedsComponent implements OnInit {

  listRssFeeds: RssFeed[];

  isLoadingListRssFeeds = false;
  isLoadingAddRssFeed = false;

  constructor(
    private rssFeedService: RssFeedService
  ) { }

  ngOnInit() {
    this.getListRssFeeds();
  }

  addRssFeed(url: string): void {
    this.isLoadingAddRssFeed = true;
    url = url.trim();
    if (!url) { return; }
    this.rssFeedService.addRssFeed({url} as RssFeed)
    .subscribe((rssFeed) => {
      this.isLoadingAddRssFeed = false;
      this.listRssFeeds.push(rssFeed);
    });
  }

  deleteRssFeed(id: number): void {
    this.listRssFeeds = this.listRssFeeds.filter((itemRssFeed) => itemRssFeed.id !== id);
    this.rssFeedService.deleteRssFeed(id).subscribe();
  }

  getListRssFeeds(): void {
    this.isLoadingListRssFeeds = true;
    this.rssFeedService.getListRssFeeds().subscribe((listRssFeeds) => {
      this.isLoadingListRssFeeds = false;
      this.listRssFeeds = listRssFeeds;
    });
  }

}
