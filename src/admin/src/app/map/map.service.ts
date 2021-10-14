import { Injectable, Directive } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Directive()
@Injectable()
export class MapService {
  constructor(private http: HttpClient) { }
}
