import { Injectable, Directive } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  createTask,
  readTask,
} from './../../client/hello_world';

@Directive()
@Injectable()
export class HomeService {
  constructor(private http: HttpClient) { }

  async createTask(name, lat, lng, desc, points) {
    console.log('Creating Task');
    await createTask(name, lat, lng, points, desc);

    console.log('Task Created');

    await readTask();
    console.log('Task READ');
  };

}
