import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RssFeed } from '@models/rssFeed';

import { MaterialModule } from '@modules/material.module';

import { RssFeedService } from '@services/rss-feed/rss-feed.service';

@Component({
  selector: 'app-rss-feed-editor',
  templateUrl: './rss-feed-editor.component.html',
  styleUrls: ['./rss-feed-editor.component.css']
})
export class RssFeedEditorComponent implements OnInit {

  rssFeed: RssFeed;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private rssFeedService: RssFeedService
  ) { }

  ngOnInit(): void {
    this.getRssFeed();
  }

  getRssFeed(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.rssFeedService.getRssFeed(id).subscribe((rssFeed) => this.rssFeed = rssFeed);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.rssFeedService.updateRssFeed(this.rssFeed).subscribe(() => this.goBack());
  }

}
