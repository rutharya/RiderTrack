import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/services";
import {User} from "../../shared/models";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser()
  }

}
