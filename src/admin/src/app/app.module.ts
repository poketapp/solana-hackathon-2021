import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { NotificationService } from './notification.service';
import { HomeService } from './home/home.service';
import { MapService } from './map/map.service';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateTaskDialog } from './home/home.component';

import { AppService } from './app.service';
import { ApiService } from './api.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PoketMaterialModule } from './material-module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { HTTPListener, HTTPStatus } from './interceptor';
import { AverageOfTwoNumbersPipe } from './utils';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBlqtYmz7dEex_cm5iRIy1xc6SUMo6Qv7A',
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
    ]),
    PoketMaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    LoginComponent,
    CreateTaskDialog,
    AverageOfTwoNumbersPipe,
  ],
  bootstrap: [AppComponent],
  providers: [
    HomeService,
    NotificationService,
    MapService,
    AppService,
    ApiService,
    HTTPListener,
    HTTPStatus,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPListener,
      multi: true,
    },
  ],
})
export class AppModule { }
