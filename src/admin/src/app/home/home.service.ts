import { Injectable, Directive } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  establishConnection,
  establishPayer,
  checkProgram,
  createTask,
  completeTask,
  readTask,
} from './../../client/hello_world';

@Directive()
@Injectable()
export class HomeService {
  constructor(private http: HttpClient) { }

  async createTask(name, lat, lng, desc, points) {
    // Establish connection to the cluster
    await establishConnection();

    // Determine who pays for the fees
    await establishPayer();

    // Check if the program has been deployed
    await checkProgram(name, lat, lng, points, desc);

    console.log('Creating Task');
    await createTask(name, lat, lng, points, desc);

    console.log('Task Created');

    await readTask();
    console.log('Task READ');
  };

}
