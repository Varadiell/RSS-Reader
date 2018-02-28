import { Component, OnInit } from '@angular/core';
import { RssFeedService } from '../rss-feed.service';
import { RssFeed } from '../rssFeed';

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
