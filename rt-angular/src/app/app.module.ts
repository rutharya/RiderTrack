import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import {LoginModule} from './login/login.module';
import { HomeModule } from './home/home.module';
import {Validators, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {
  ApiService,
  UserService,
  JwtService,
  StatisticsService,
  EventsService,
  MapService,
  AuthGuardService,
  SharedModule,
  FooterComponent,
  HeaderComponent,
  SimpleModalComponent,
  ModalTriggerDirective,
  JQ_TOKEN,
  HttpTokenInterceptor
} from './shared/';
import { LandingComponent } from './landing/landing.component';
import { ChartComponent } from './home/dashboard/chart/chart.component';
import {NoAuthGuard} from './login/no-auth-guard.service';
import {EventsModule} from './events/events.module';
import { ApiComponent } from './api/api.component';
import {TrackingModule} from './tracking/tracking.module';
import {LatestLocationService} from './shared/services/latest-location.service';
import {RiderLocationsService} from './shared/services/rider-locations.service';
import {UploadFileService} from './shared/services/uploadFile.service';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';
declare let jQuery: Object;

const rootRouting: ModuleWithProviders = RouterModule.forRoot([
  // {
  //   path: '',
  //   component: LandingComponent,
  //   canActivate: [NoAuthGuard]
  // },
  // {
  //   path:'home',
  //
  // }
]);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    SimpleModalComponent,
    ModalTriggerDirective,
    ApiComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    HomeModule,
    EventsModule,
    rootRouting,
    SharedModule,
    TrackingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule.forRoot()
    // CollapseModule.forRoot(),
    // BsDropdownModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true},
    ApiService,
    {provide: JQ_TOKEN, useValue: jQuery},
    AuthGuardService,
    JwtService,
    UserService,
    StatisticsService,
    EventsService,
    LatestLocationService,
    MapService,
    UploadFileService,
    RiderLocationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
