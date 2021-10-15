import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public createTask(name: string, lat: string, lng: string, points: string, desc: string) {
    // will use this.http.get()
  }
}
