import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { AppComponent } from './app.component';
import {LoginModule} from "./login/login.module";
import { HomeModule } from './home/home.module';



import{
  ApiService,
  UserService,
  JwtService,
  StatisticsService,
  AuthGuardService,
  SharedModule,
  FooterComponent,
  HeaderComponent,
  HttpTokenInterceptor
} from './shared/';
import { LandingComponent } from './landing/landing.component';
import { ChartComponent } from './home/dashboard/chart/chart.component';
import {NoAuthGuard} from "./login/no-auth-guard.service";
import {EventsModule} from "./events/events.module";
import { ApiComponent } from './api/api.component';




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
    ApiComponent,
  ],
  imports: [
    BrowserModule,
    LoginModule,
    HomeModule,
    EventsModule,
    rootRouting,
    SharedModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true},
    ApiService,
    AuthGuardService,
    JwtService,
    UserService,
    StatisticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
