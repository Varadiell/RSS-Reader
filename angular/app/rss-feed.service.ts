import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RSSFEEDS } from './mock-rssFeeds';
import { RssFeed } from './rssFeed';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class RssFeedService {

  constructor(
    private http: HttpClient
  ) { }

  addRssFeed(rssFeed: RssFeed): Observable<RssFeed> {
    return this.http.post<RssFeed>('api/rssFeed', rssFeed, httpOptions)
    .pipe(
      tap((newRssFeed: RssFeed) => this.log(`added rssFeed id=${newRssFeed.id}`)),
      catchError(this.handleError<RssFeed>('addRssFeed(rssFeed)'))
    );
  }

  deleteRssFeed(rssFeed: RssFeed): Observable<RssFeed> {
    return this.http.delete<RssFeed>(`api/rssFeed/${rssFeed.id}`)
    .pipe(
      tap((_) => this.log(`deleted rssFeed id: ${rssFeed.id}`)),
      catchError(this.handleError<RssFeed>(`deleteRssFeed(${rssFeed.id})`))
    );
  }

  getRssFeeds(): Observable<RssFeed[]> {
    return this.http.get<RssFeed[]>('api/rssFeeds')
    .pipe(
      tap((rssFeeds) => this.log('fetched rssFeeds')),
      catchError(this.handleError('getRssFeeds()', []))
    );
  }

  getRssFeed(id: number): Observable<RssFeed> {
    return this.http.get<RssFeed>(`api/rssFeed/${id}`)
    .pipe(
      tap((_) => this.log(`fetched rssFeed id: ${id}`)),
      catchError(this.handleError<RssFeed>(`getRssFeed(${id})`))
    );
  }

  updateRssFeed(rssFeed: RssFeed): Observable<any> {
    return this.http.put(`api/rssFeed/${rssFeed.id}`, rssFeed, httpOptions)
    .pipe(
      tap((_) => this.log(`updated rssFeed id: ${rssFeed.id}`)),
      catchError(this.handleError<any>('updateRssFeed(rssFeed)'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

}
