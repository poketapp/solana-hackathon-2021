import { Injectable, Directive, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Directive()
@Injectable()
export class HomeService {
  constructor(private http: HttpClient) { }

  @Output() taskCreated = new EventEmitter();

  async createTask(name, lat, lng, desc, points) {
    const data = {
      'name': name,
      'lat': lat,
      'lng': lng,
      'points': points,
      'desc': desc
    }

    const url = 'http://127.0.0.1:3000/create';
    const options = {
      headers: { 'Content-Type': 'application/json' },
    };
    this.http
      .post(url, JSON.stringify(data), options)
      .subscribe((res) => {
        console.log(res);
        this.taskCreated.emit(data);
      });
      this.taskCreated.emit(data);
  };

}
