import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RssNews } from '@models/rssNews';

import { ErrorHandlerService} from '@services/error-handler/error-handler.service';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class RssNewsService {

  constructor(
    private errorHandler: ErrorHandlerService,
    private http: HttpClient
  ) { }

  getListRssNews(id: number): Observable<RssNews[]> {
    return this.http.get<RssNews[]>(`api/rssFeed/${id}/news`)
    .pipe(
      catchError(this.errorHandler.handleError('getListRssNews()', []))
    );
  }

  getRssNews(id: number): Observable<RssNews> {
    return this.http.get<RssNews>(`api/rssNews/${id}`)
    .pipe(
      catchError(this.errorHandler.handleError<RssNews>(`getRssNews(${id})`))
    );
  }

  refreshListRssNews(id: number): Observable<RssNews[]> {
    return this.http.get<RssNews[]>(`api/rssFeed/${id}/news/refresh`)
    .pipe(
      catchError(this.errorHandler.handleError('refreshListRssNews()', []))
    );
  }

}
