import { Injectable } from '@angular/core';
import { RSSFEEDS } from './mock-rssFeeds';
import { RssFeed } from './rssFeed';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class RssFeedService {

  constructor() { }

  getRssFeeds(): Observable<RssFeed[]> {
    return of(RSSFEEDS);
  }

  getRssFeed(id: number): Observable<RssFeed> {
    return of(RSSFEEDS.find((rssFeed) => rssFeed.id === id));
  }

}
