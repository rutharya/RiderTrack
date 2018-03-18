import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../shared/services';
import {User} from '../../shared/models';
import {HeaderComponent} from '../../shared/layout';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  EDL: string;
  details: FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.EDL = 'Edit';
    this.details = new FormGroup({
      image: new FormControl(), username: new FormControl(), bio: new FormControl(),
      email: new FormControl(), password: new FormControl(), passwordconf: new FormControl()
    });
    this.details.disable();
  }
  submitForm() {
    console.log('in submit form');

  }

  enableEdit() {

    if (this.details.enabled) {
      this.details.disable();
      this.EDL = 'Lock';
    } else {
      this.details.enable();
      this.EDL = 'Edit';
    }

  }
}
