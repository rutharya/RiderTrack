import { Component, OnInit } from '@angular/core';
import * as toastr from 'toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    toastr.success('login successful');
  }

  onNotify(dataChanged: boolean) {

  }
}
