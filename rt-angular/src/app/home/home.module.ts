import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule, SidebarComponent } from '../shared/';
import {LandingComponent} from "../landing/landing.component";
import {NoAuthGuard} from "../login/no-auth-guard.service";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {ChartComponent} from "../chart/chart.component";
import {HttpClientModule} from "@angular/common/http";

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: LandingComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      isAuthenticated: HomeAuthResolver
    }
  }
]);

@NgModule({
  imports: [
    homeRouting,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    SidebarComponent,
    DashboardComponent,
    ChartComponent
  ],
  providers: [
    HomeAuthResolver
  ]
})
export class HomeModule {}
