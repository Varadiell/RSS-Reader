import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MaterialModule } from '@modules/material.module';

import { RssNews } from '@models/rssNews';

import { RssNewsService } from '@services/rss-news/rss-news.service';

@Component({
  selector: 'app-news-viewer',
  templateUrl: './news-viewer.component.html',
  styleUrls: ['./news-viewer.component.css']
})
export class NewsViewerComponent implements OnInit {

  rssNews: RssNews;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private rssNewsService: RssNewsService
  ) { }

  ngOnInit() {
    this.getRssNews();
  }

  getRssNews(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.rssNewsService.getRssNews(id).subscribe((rssNews) => this.rssNews = rssNews);
  }

  goBack(): void {
    this.location.back();
  }

  setFavorite(id: number): void {
    this.rssNewsService.setFavorite(id).subscribe((res) => {
      if (res === true) {
        this.rssNews.isFavorite = true;
      }
    });
  }

  unsetFavorite(id: number): void {
    this.rssNewsService.unsetFavorite(id).subscribe((res) => {
      if (res === true) {
        this.rssNews.isFavorite = false;
      }
    });
  }

}
