import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { RssFeed } from '@models/rssFeed';
import { RssNews } from '@models/rssNews';

import { MaterialModule } from '@modules/material.module';

import { DialogService } from '@services/dialog/dialog.service';
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

  isLoadingRssNews = false;

  // Paginator
  length: number;
  page: number;
  previousPageSize: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private location: Location,
    private router: Router,
    private rssFeedService: RssFeedService,
    private rssNewsService: RssNewsService
  ) { }

  ngOnInit() {
    this.page = +this.route.snapshot.queryParamMap.get('page') || 1;
    this.previousPageSize = +this.route.snapshot.queryParamMap.get('pageSize') || 10;
    this.getRssFeed();
    this.getListRssNews();
  }

  deleteRssFeed(id: number): void {
    this.dialogService.confirm('Delete RssFeed', 'The selected RssFeed will be deleted.').subscribe((res) => {
      if ( res === true) {
        this.rssFeedService.deleteRssFeed(id).subscribe(() => {
          this.router.navigate(['/rssFeeds']);
        });
      }
    });
  }

  getRssFeed(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.rssFeedService.getRssFeed(id).subscribe((rssFeed) => this.rssFeed = rssFeed);
  }

  getListRssNews(): void {
    this.isLoadingRssNews = true;
    const id = +this.route.snapshot.paramMap.get('id');
    const page = this.paginator ? this.paginator.pageIndex + 1 : this.page;
    const pageSize = this.paginator ? this.paginator.pageSize : this.previousPageSize;
    this.rssNewsService.getListRssNews(id, page, pageSize).subscribe((data) => {
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
    this.location.replaceState(`/rssFeed/${id}/news`, `page=${page}&pageSize=${pageSize}`);
    this.getListRssNews();
  }

  refreshRssNews(): void {
    this.isLoadingRssNews = true;
    this.paginator.pageIndex = 0;
    const id = +this.route.snapshot.paramMap.get('id');
    const page = this.paginator.pageIndex + 1;
    const pageSize = this.paginator.pageSize;
    this.rssNewsService.refreshListRssNews(id).subscribe(() => {
      this.rssNewsService.getListRssNews(id, page, pageSize).subscribe((data) => {
        this.isLoadingRssNews = false;
        this.listRssNews = data.listRssNews;
        this.paginator.length = data.count;
      });
    });
  }

}
