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
  AuthGuardService,
  SharedModule,
  FooterComponent,
  HeaderComponent,
  HttpTokenInterceptor
} from './shared/';
import { LandingComponent } from './landing/landing.component';




const rootRouting: ModuleWithProviders = RouterModule.forRoot([]);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    HomeModule,
    rootRouting,
    SharedModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true},
    ApiService,
    AuthGuardService,
    JwtService,
    UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
