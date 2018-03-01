import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RssFeed } from '@models/rssFeed/rssFeed';

import { LoggerService } from '@services/logger/logger.service';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class RssFeedService {

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) { }

  addRssFeed(rssFeed: RssFeed): Observable<RssFeed> {
    return this.http.post<RssFeed>('api/rssFeed', rssFeed, httpOptions)
    .pipe(
      tap((newRssFeed: RssFeed) => this.logger.log(`added rssFeed id=${newRssFeed.id}`)),
      catchError(this.handleError<RssFeed>('addRssFeed(rssFeed)'))
    );
  }

  deleteRssFeed(rssFeed: RssFeed): Observable<RssFeed> {
    return this.http.delete<RssFeed>(`api/rssFeed/${rssFeed.id}`)
    .pipe(
      tap((_) => this.logger.log(`deleted rssFeed id: ${rssFeed.id}`)),
      catchError(this.handleError<RssFeed>(`deleteRssFeed(${rssFeed.id})`))
    );
  }

  getRssFeeds(): Observable<RssFeed[]> {
    return this.http.get<RssFeed[]>('api/rssFeeds')
    .pipe(
      tap((rssFeeds) => this.logger.log('fetched rssFeeds')),
      catchError(this.handleError('getRssFeeds()', []))
    );
  }

  getRssFeed(id: number): Observable<RssFeed> {
    return this.http.get<RssFeed>(`api/rssFeed/${id}`)
    .pipe(
      tap((_) => this.logger.log(`fetched rssFeed id: ${id}`)),
      catchError(this.handleError<RssFeed>(`getRssFeed(${id})`))
    );
  }

  updateRssFeed(rssFeed: RssFeed): Observable<any> {
    return this.http.put(`api/rssFeed/${rssFeed.id}`, rssFeed, httpOptions)
    .pipe(
      tap((_) => this.logger.log(`updated rssFeed id: ${rssFeed.id}`)),
      catchError(this.handleError<any>('updateRssFeed(rssFeed)'))
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
