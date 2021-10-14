import { Injectable, Directive } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Directive()
@Injectable()
export class HomeService {
  constructor(private http: HttpClient) { }

  fetchData = (): [] => {
    return [];
  };
}
