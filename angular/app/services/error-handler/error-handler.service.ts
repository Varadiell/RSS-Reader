import { Injectable } from '@angular/core';

import { LoggerService } from '@services/logger/logger.service';

import { Observable, of } from 'rxjs';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private logger: LoggerService
  ) { }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(`${error.error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
