import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  msg = '';
  loggingIn = false;
  model: any = {};
  hidePassword = true;

  constructor(
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  onSubmit = (): void => {
    this.loggingIn = true;

    const username = this.model.username;
    const password = this.model.password;

    this.loggingIn = false;
    let route = '/';

    this.router.navigate([route]);
    this.appService.loginEvent.emit(true);

  }
}
