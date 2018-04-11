import {SharedModule} from '../shared';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EventsComponent} from './events.component';
import {NoAuthGuard} from '../login/no-auth-guard.service';
import {ModuleWithProviders} from '@angular/compiler/src/core';
import {EventsService} from '../shared/services';
import {AuthGuardService} from '../shared/services/auth-guard.service';
import {EventTrackingComponent} from './event-tracking/event-tracking.component';
import {RiderTrackingComponent} from './event-tracking/rider-tracking/rider-tracking.component';
import {EventThumbnailComponent} from './event-thumbnail';

const eventsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'eventTracking',
    component: EventTrackingComponent
  },
  {
    path: 'eventTracking/:id',
    component: EventTrackingComponent
  },
  {
    path: 'riderTracking',
    component: RiderTrackingComponent
  },
  {
    path: 'riderTracking/:eventid/:riderid',
    component: RiderTrackingComponent
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
    eventsRouting,
    SharedModule,
    RouterModule
  ],
  declarations: [
    EventsComponent,
    EventTrackingComponent,
    EventThumbnailComponent,
    RiderTrackingComponent
  ],

  providers: [
    NoAuthGuard,
    EventsService
  ]
})
export class EventsModule {}
