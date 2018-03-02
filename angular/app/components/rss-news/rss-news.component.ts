import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RssFeed } from '@models/rssFeed';
import { RssNews } from '@models/rssNews';

import { MaterialModule } from '@modules/material.module';

import { RssFeedService } from '@services/rss-feed/rss-feed.service';
import { RssNewsService } from '@services/rss-news/rss-news.service';

@Component({
  selector: 'app-rss-news',
  templateUrl: './rss-news.component.html',
  styleUrls: ['./rss-news.component.css']
})
export class RssNewsComponent implements OnInit {

  rssFeed: RssFeed;
  listRssNews: RssNews[];

  constructor(
    private route: ActivatedRoute,
    private rssFeedService: RssFeedService,
    private rssNewsService: RssNewsService
  ) { }

  ngOnInit() {
    this.getRssFeed();
    this.getListRssNews();
  }

  getRssFeed(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.rssFeedService.getRssFeed(id).subscribe((rssFeed) => this.rssFeed = rssFeed);
  }

  getListRssNews(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.rssNewsService.getListRssNews(id).subscribe((listRssNews) => this.listRssNews = listRssNews);
  }

}
