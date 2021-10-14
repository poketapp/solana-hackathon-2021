import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { HTTPStatus } from './interceptor';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @Input() isLoggedIn = true;
  public showOverlay = false;

  constructor(
    private appService: AppService,
    private router: Router,
    private httpStatus: HTTPStatus
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = true;

    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      this.showOverlay = status;
    });

    this.appService.loginEvent.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (!loggedIn) {
        this.logout();
      }
    });
  }

  logout = (): void => {
    localStorage.clear();
    this.isLoggedIn = false;
    this.showOverlay = false;
    this.router.navigate(['login']);
  };
}
