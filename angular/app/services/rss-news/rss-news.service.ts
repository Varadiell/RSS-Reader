import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RssNews } from '@models/rssNews';

import { LoggerService } from '@services/logger/logger.service';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class RssNewsService {

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) { }

  getListRssNews(id: number): Observable<RssNews[]> {
    return this.http.get<RssNews[]>(`api/rssFeed/${id}/news`)
    .pipe(
      catchError(this.handleError('getListRssNews()', []))
    );
  }

  getRssNews(id: number): Observable<RssNews> {
    return this.http.get<RssNews>(`api/rssNews/${id}`)
    .pipe(
      catchError(this.handleError<RssNews>(`getRssNews(${id})`))
    );
  }

  refreshListRssNews(id: number): Observable<RssNews[]> {
    return this.http.get<RssNews[]>(`api/rssFeed/${id}/news/refresh`)
    .pipe(
      catchError(this.handleError('refreshListRssNews()', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(`${error.error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
