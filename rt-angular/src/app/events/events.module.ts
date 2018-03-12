import {SharedModule} from "../shared";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {EventsComponent} from "./events.component";
import {NoAuthGuard} from "../login/no-auth-guard.service";
import {ModuleWithProviders} from "@angular/compiler/src/core";

const eventsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'events',
    component: EventsComponent
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
    SharedModule
  ],
  declarations: [
    EventsComponent
  ],

  providers: [
    NoAuthGuard
  ]
})
export class EventsModule {}
