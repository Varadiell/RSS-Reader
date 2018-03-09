import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RssFeed } from '@models/rssFeed';

import { ErrorHandlerService} from '@services/error-handler/error-handler.service';
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
    private errorHandler: ErrorHandlerService,
    private http: HttpClient,
    private logger: LoggerService
  ) { }

  addRssFeed(rssFeed: RssFeed): Observable<RssFeed> {
    return this.http.post<RssFeed>('api/rssFeed', rssFeed, httpOptions)
    .pipe(
      tap((newRssFeed: RssFeed) => {
        this.logger.success(`Added "${newRssFeed.title}".`);
      }),
      catchError(this.errorHandler.handleError<RssFeed>('addRssFeed(rssFeed)'))
    );
  }

  deleteRssFeed(id: number): Observable<RssFeed> {
    return this.http.delete<RssFeed>(`api/rssFeed/${id}`)
    .pipe(
      tap(() => this.logger.log(`Deleted.`)),
      catchError(this.errorHandler.handleError<RssFeed>(`deleteRssFeed(${id})`))
    );
  }

  getListRssFeeds(): Observable<RssFeed[]> {
    return this.http.get<RssFeed[]>('api/rssFeeds')
    .pipe(
      catchError(this.errorHandler.handleError('getListRssFeeds()', []))
    );
  }

  getRssFeed(id: number): Observable<RssFeed> {
    return this.http.get<RssFeed>(`api/rssFeed/${id}`)
    .pipe(
      catchError(this.errorHandler.handleError<RssFeed>(`getRssFeed(${id})`))
    );
  }

  updateRssFeed(rssFeed: RssFeed): Observable<any> {
    return this.http.put(`api/rssFeed/${rssFeed.id}`, rssFeed, httpOptions)
    .pipe(
      tap(() => this.logger.success(`Saved.`)),
      catchError(this.errorHandler.handleError<any>('updateRssFeed(rssFeed)'))
    );
  }

}
