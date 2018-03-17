import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../shared/services';
import {User} from '../../shared/models';
import {HeaderComponent} from '../../shared/layout';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  isSubmitting: boolean;
  EDL: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.isSubmitting = false;
    this.EDL = 'Edit';
  }

  submitForm() {

  }

  enableEdit() {
    if (this.isSubmitting === true) {
      this.isSubmitting = false;
      this.EDL = 'Lock';
    } else {
      this.EDL = 'Edit';
      this.isSubmitting = true;
    }
  }
}
