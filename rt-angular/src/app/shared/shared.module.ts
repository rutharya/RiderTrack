import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { ListErrorsComponent } from './list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [ListErrorsComponent,ShowAuthedDirective],
  exports:[FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ListErrorsComponent,
    RouterModule,
    ShowAuthedDirective]
})
export class SharedModule { }
