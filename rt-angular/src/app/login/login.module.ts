import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared';
import {LoginComponent} from "./login.component";
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
// import {ForgotPwdComponent2} from "./forgot-pwd2/forgot-pwd.component2";

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
  },
  // {
  //   path:'forgotpwd/:id',
  //   component: ForgotPwdComponent2,
  //   canActivate: [NoAuthGuard]
  // }
]);

@NgModule({
  imports: [
    authRouting,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    ForgotPwdComponent,
    // ForgotPwdComponent2
  ],

  providers: [
    NoAuthGuard
  ]
})
export class LoginModule {}
