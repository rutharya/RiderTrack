import { Component, OnInit } from '@angular/core';
import {UserService} from "../services";
import { User } from '../models';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService,private router: Router
  ) {}

  currentUser: User;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }

  logout(){
      this.userService.purgeAuth();
      this.router.navigateByUrl('/');
  }

}
