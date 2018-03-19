import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared';
import {LoginComponent} from "./login.component";
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path:'forgotpwd',
    component: ForgotPwdComponent,
    canActivate: [NoAuthGuard]
  }
]);

@NgModule({
  imports: [
    authRouting,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    ForgotPwdComponent
  ],

  providers: [
    NoAuthGuard
  ]
})
export class LoginModule {}
