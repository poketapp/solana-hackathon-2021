import { Injectable, Output, EventEmitter, Directive } from '@angular/core';

@Directive()
@Injectable()
export class AppService {
  @Output() loginEvent = new EventEmitter();

  getUser = (): {} => {
    return {
      "username" : "test_user",
      "password": "some_pwd",
    };
  };
}
