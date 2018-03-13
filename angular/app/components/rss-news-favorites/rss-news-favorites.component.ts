import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { RssNews } from '@models/rssNews';

import { MaterialModule } from '@modules/material.module';

import { RssNewsService } from '@services/rss-news/rss-news.service';

@Component({
  selector: 'app-rss-news-favorites',
  templateUrl: './rss-news-favorites.component.html',
  styleUrls: ['./rss-news-favorites.component.css']
})
export class RssNewsFavoritesComponent implements OnInit {

  listRssNews: RssNews[];

  isLoadingRssNews = false;

  // Paginator
  length: number;
  page: number;
  previousPageSize: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private rssNewsService: RssNewsService
  ) { }

  ngOnInit() {
    this.page = +this.route.snapshot.queryParamMap.get('page') || 1;
    this.previousPageSize = +this.route.snapshot.queryParamMap.get('pageSize') || 10;
    this.getListRssNewsFavorites();
  }

  getListRssNewsFavorites(): void {
    this.isLoadingRssNews = true;
    const id = +this.route.snapshot.paramMap.get('id');
    const page = this.paginator ? this.paginator.pageIndex + 1 : this.page;
    const pageSize = this.paginator ? this.paginator.pageSize : this.previousPageSize;
    this.rssNewsService.getListRssNewsFavorites(id, page, pageSize).subscribe((data) => {
      this.isLoadingRssNews = false;
      this.listRssNews = data.listRssNews;
      if (this.paginator) {
        this.paginator.length = data.count;
      } else {
        this.length = data.count;
      }
    });
  }

  pageChange(event) {
    if (event.pageSize !== this.previousPageSize) {
      this.paginator.pageIndex = 0;
      this.previousPageSize = event.pageSize;
    }
    const id = +this.route.snapshot.paramMap.get('id');
    const page = this.paginator.pageIndex + 1;
    const pageSize = this.paginator.pageSize;
    this.location.replaceState(`/rssNews/favorites`, `page=${page}&pageSize=${pageSize}`);
    this.getListRssNewsFavorites();
  }

  setFavorite(id: number): void {
    this.rssNewsService.setFavorite(id).subscribe((res) => {
      if (res === true) {
        this.listRssNews.map((itemRssNews) => {
          if (itemRssNews.id === id) {
            itemRssNews.isFavorite = true;
          }
        });
      }
    });
  }

  unsetFavorite(id: number): void {
    this.rssNewsService.unsetFavorite(id).subscribe((res) => {
      if (res === true) {
        this.listRssNews.map((itemRssNews) => {
          if (itemRssNews.id === id) {
            itemRssNews.isFavorite = false;
          }
        });
      }
    });
  }

}
