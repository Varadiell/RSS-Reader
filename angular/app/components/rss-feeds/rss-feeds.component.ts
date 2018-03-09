import { Component, OnInit } from '@angular/core';

import { RssFeed } from '@models/rssFeed';

import { MaterialModule } from '@modules/material.module';

import { DialogService } from '@services/dialog/dialog.service';
import { RssFeedService } from '@services/rss-feed/rss-feed.service';

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
    private dialogService: DialogService,
    private rssFeedService: RssFeedService
  ) { }

  ngOnInit() {
    this.getListRssFeeds();
  }

  addRssFeed(url: string): void {
    url = url.trim();
    if (!url) { return; }
    this.isLoadingAddRssFeed = true;
    this.rssFeedService.addRssFeed({url} as RssFeed)
    .subscribe((rssFeed) => {
      this.isLoadingAddRssFeed = false;
      if (rssFeed) { this.listRssFeeds.push(rssFeed); }
    });
  }

  deleteRssFeed(id: number): void {
    this.dialogService.confirm('Delete RssFeed', 'The selected RssFeed will be deleted.').subscribe((res) => {
      if ( res === true) {
        this.listRssFeeds = this.listRssFeeds.filter((itemRssFeed) => itemRssFeed.id !== id);
        this.rssFeedService.deleteRssFeed(id).subscribe();
      }
    });
  }

  getListRssFeeds(): void {
    this.isLoadingListRssFeeds = true;
    this.rssFeedService.getListRssFeeds().subscribe((listRssFeeds) => {
      this.isLoadingListRssFeeds = false;
      this.listRssFeeds = listRssFeeds;
    });
  }

}
