import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { AppService } from './app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class HTTPStatus {
  private requestInFlight$: BehaviorSubject<boolean>;
  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }

  setHttpStatus(inFlight: boolean): void {
    this.requestInFlight$.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}

@Injectable()
export class HTTPListener implements HttpInterceptor {
  constructor(
    private status: HTTPStatus,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event) => {
        this.status.setHttpStatus(true);
        return event;
      }),
      catchError((error) => {
        return Observable.throw(error);
      }),
      finalize(() => {
        this.status.setHttpStatus(false);
      })
    );
  }
}
