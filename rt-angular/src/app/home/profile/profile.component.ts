import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../shared/services';
import {User} from '../../shared/models';
import {HeaderComponent} from '../../shared/layout';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {matchOtherValidator} from './match-other-validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  EDL: string;
  details: FormGroup;
  phonenumber: string;
  email: string;
  password: string;
  passwordconf: string;

  constructor(private userService: UserService) {
    this.details = new FormGroup({});
  }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.EDL = 'Edit';
    this.details = new FormGroup({
      image: new FormControl(),
      bio: new FormControl(),
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      password: new FormControl(this.password, [Validators.required, Validators.pattern(
        '^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
      passwordconf: new FormControl(this.passwordconf, [Validators.required, matchOtherValidator('password')]),
      firstname: new FormControl(),
      lastname: new FormControl(),
      height: new FormControl(),
      weight: new FormControl(),
      phonenumber: new FormControl(this.phonenumber, [Validators.required, Validators.pattern('[0-9]{10}')]),
      address: new FormControl(),
      address2: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      zipcode: new FormControl()
    });

    this.details.disable();
  }



  submitForm() {
    console.log('in submit form');
    console.log(this.details.get('gender'));
    console.log(this.details.status);

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
