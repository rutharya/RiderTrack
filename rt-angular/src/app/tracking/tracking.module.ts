import {SharedModule} from "../shared";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {NoAuthGuard} from "../login/no-auth-guard.service";
import {ModuleWithProviders} from "@angular/compiler/src/core";
import {TrackingComponent} from "./tracking.component";
import {LatestLocationService} from "../shared/services/latest-location.service";

const trackingRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'tracking',
    component: TrackingComponent
  }
  // },
  // {
  //   path: 'events/:id',
  //   component: LoginComponent,
  //   canActivate: [NoAuthGuard]
  // }
]);

@NgModule({
  imports: [
    trackingRouting,
    SharedModule
  ],
  declarations: [
    TrackingComponent
  ],

  providers: [
    NoAuthGuard,
    LatestLocationService
  ]
})
export class TrackingModule {}
