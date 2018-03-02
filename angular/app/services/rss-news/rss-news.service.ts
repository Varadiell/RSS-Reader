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
      tap(() => this.logger.log('fetched listRssNews')),
      catchError(this.handleError('getListRssNews()', []))
    );
  }

  getRssNews(id: number): Observable<RssNews> {
    return this.http.get<RssNews>(`api/rssNews/${id}`)
    .pipe(
      tap(() => this.logger.log(`fetched rssNews id: ${id}`)),
      catchError(this.handleError<RssNews>(`getRssNews(${id})`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(error);
      this.logger.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
