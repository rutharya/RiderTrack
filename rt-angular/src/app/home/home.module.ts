import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule, SidebarComponent } from '../shared/';
// import {LandingComponent} from "../landing/landing.component";
// import {NoAuthGuard} from "../login/no-auth-guard.service";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ChartComponent} from "./dashboard/chart/chart.component";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuardService} from "../shared/services";
import {LandingComponent} from "../landing/landing.component";
import {NoAuthGuard} from "../login/no-auth-guard.service";
import {ApiComponent} from "../api/api.component";
import { ProfileComponent } from './profile/profile.component';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path:'',
    component: LandingComponent
  },
  {
    path:'api',
    component:ApiComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[AuthGuardService],
    resolve: {
      isAuthenticated: HomeAuthResolver
    },
    children:[
      {path:'',redirectTo:'dashboard',canActivate: [AuthGuardService],pathMatch:'full'},
      { path:'dashboard' , canActivate: [AuthGuardService],component: DashboardComponent},
      {path: 'profile',canActivate: [AuthGuardService],component: ProfileComponent}]
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
    ChartComponent,
    ProfileComponent
  ],
  providers: [
    HomeAuthResolver
  ]
})
export class HomeModule {}
