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
  fname: string;
  lname: string;
  height: number;
  weight: number;
  phonenumber: string;
  email: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
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
      firstname: new FormControl(this.fname, [Validators.required]),
      lastname: new FormControl(this.lname, [Validators.required]),
      height: new FormControl(this.height, [Validators.required]),
      weight: new FormControl(this.weight, [Validators.required]),
      phonenumber: new FormControl(this.phonenumber, [Validators.required, Validators.pattern('[0-9]{10}')]),
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      address: new FormControl(this.address, [Validators.required]),
      address2: new FormControl(),
      city: new FormControl(this.city, [Validators.required]),
      state: new FormControl(this.state, [Validators.required]),
      zipcode: new FormControl(this.zipcode, [Validators.required]),
      bio: new FormControl(),
      password: new FormControl(this.password, [Validators.required, Validators.pattern(
        '^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
      passwordconf: new FormControl(this.passwordconf, [Validators.required, matchOtherValidator('password')])
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
