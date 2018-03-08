import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule } from '../shared';
import {LandingComponent} from "../landing/landing.component";
import {NoAuthGuard} from "../login/no-auth-guard.service";

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
    SharedModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    HomeAuthResolver
  ]
})
export class HomeModule {}
