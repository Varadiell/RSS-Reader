import { inject, TestBed } from '@angular/core/testing';

import { RssNewsService } from './rss-news/rss-news.service';

describe('RssNewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RssNewsService]
    });
  });

  it('should be created', inject([RssNewsService], (service: RssNewsService) => {
    expect(service).toBeTruthy();
  }));
});
