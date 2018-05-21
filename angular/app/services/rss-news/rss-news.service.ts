import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RssNews } from '@models/rssNews';

import { ErrorHandlerService} from '@services/error-handler/error-handler.service';

import { Observable, of } from 'rxjs';
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

  getListRssNews(id: number, page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`api/rssFeed/${id}/news?page=${page}&pageSize=${pageSize}`)
    .pipe(
      catchError(this.errorHandler.handleError(`getListRssNews(${id}, ${page}, ${pageSize})`, {count : 0, listRssNews : []}))
    );
  }

  getListRssNewsFavorites(id: number, page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`api/rssNews/favorites?page=${page}&pageSize=${pageSize}`)
    .pipe(
      catchError(this.errorHandler.handleError(`getListRssNewsFavorites(${id}, ${page}, ${pageSize})`, {count : 0, listRssNews : []}))
    );
  }

  getRssNews(id: number): Observable<RssNews> {
    return this.http.get<RssNews>(`api/rssNews/${id}`)
    .pipe(
      catchError(this.errorHandler.handleError<RssNews>(`getRssNews(${id})`))
    );
  }

  refreshListRssNews(id: number): Observable<any> {
    return this.http.get<any>(`api/rssFeed/${id}/news/refresh`)
    .pipe(
      catchError(this.errorHandler.handleError(`refreshListRssNews(${id})`))
    );
  }

  setFavorite(id: number): Observable<any> {
    return this.http.put<any>(`api/rssNews/${id}/favorite`, null)
    .pipe(
      catchError(this.errorHandler.handleError(`setFavorite(${id})`))
    );
  }

  unsetFavorite(id: number): Observable<any> {
    return this.http.delete<any>(`api/rssNews/${id}/favorite`)
    .pipe(
      catchError(this.errorHandler.handleError(`unsetFavorite(${id})`))
    );
  }

}
