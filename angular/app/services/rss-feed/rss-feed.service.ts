import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RssFeed } from '@models/rssFeed';

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
      tap((newRssFeed: RssFeed) => {
        this.logger.success(`Added "${newRssFeed.title}".`);
      }),
      catchError(this.handleError<RssFeed>('addRssFeed(rssFeed)'))
    );
  }

  deleteRssFeed(id: number): Observable<RssFeed> {
    return this.http.delete<RssFeed>(`api/rssFeed/${id}`)
    .pipe(
      tap(() => this.logger.log(`Deleted.`)),
      catchError(this.handleError<RssFeed>(`deleteRssFeed(${id})`))
    );
  }

  getListRssFeeds(): Observable<RssFeed[]> {
    return this.http.get<RssFeed[]>('api/rssFeeds')
    .pipe(
      catchError(this.handleError('getListRssFeeds()', []))
    );
  }

  getRssFeed(id: number): Observable<RssFeed> {
    return this.http.get<RssFeed>(`api/rssFeed/${id}`)
    .pipe(
      catchError(this.handleError<RssFeed>(`getRssFeed(${id})`))
    );
  }

  updateRssFeed(rssFeed: RssFeed): Observable<any> {
    return this.http.put(`api/rssFeed/${rssFeed.id}`, rssFeed, httpOptions)
    .pipe(
      tap(() => this.logger.success(`Saved.`)),
      catchError(this.handleError<any>('updateRssFeed(rssFeed)'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(`Error ${error.status} : ${error.statusText}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
