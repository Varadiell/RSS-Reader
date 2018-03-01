import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RssFeed } from '@models/rssFeed/rssFeed';

import { MaterialModule } from '@modules/material/material.module';

import { RssFeedService } from '@services/rss-feed/rss-feed.service';

@Component({
  selector: 'app-rss-news',
  templateUrl: './rss-news.component.html',
  styleUrls: ['./rss-news.component.css']
})
export class RssNewsComponent implements OnInit {

  rssFeed: RssFeed;

  constructor(
    private route: ActivatedRoute,
    private rssFeedService: RssFeedService
  ) { }

  ngOnInit() {
    this.getRssFeed();
  }

  getRssFeed(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.rssFeedService.getRssFeed(id).subscribe((rssFeed) => this.rssFeed = rssFeed);
  }

}
