import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../shared/services";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}
  componentType = 'dashboard';
  isAuthenticated: boolean;

  tags: Array<string> = [];
  tagsLoaded = false;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

      }
    );

  }

  onNotify(message: boolean) {
    console.log('received event in home component');
    // switch(message){
    //   case 'events_clicked':
    //     console.log('to events');
    //     this.componentType = 'events';
    //     this.router.navigateByUrl('/events');
    //     break;
    //   case 'dashboard_clicked':
    //     this.componentType = 'dashboard';
    //     console.log('swithc to dashboard');
    //     this.router.navigateByUrl('/home');
    //     break;
    //   default: break;
    // }
  }

}
