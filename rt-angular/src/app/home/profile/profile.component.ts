import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../shared/services';
import {User} from '../../shared/models';
import {HeaderComponent} from '../../shared/layout';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {matchOtherValidator} from './match-other-validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  profileForm: FormGroup;
  isSubmitting = false;
  currentUser: User;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      username: '',
      bio: '',
      email: '',
      firstName: '',
      lastName: '',
      height: '',
      weight: '',
      phoneNo: '',
      address: '',
      image: '',
      password: '',
      passwordconf: ''
    });
  }

  ngOnInit() {
    Object.assign(this.user, this.userService.getCurrentUser());
    this.currentUser = this.userService.getCurrentUser();
    // this.EDL = 'Edit';
    console.log('value of this .user');
    console.log(this.user);
    this.profileForm.patchValue(this.user);
  }


  submitForm() {
    console.log('in submit form');
    console.log(this.profileForm.get('gender'));
    console.log(this.profileForm.status);
    console.log(this.user);

    this.isSubmitting = true;
    this.userService
      .update(this.profileForm.value)
      .subscribe(
        // updatedUser => this.router.navigateByUrl('/home/profile'),
        // err => {
        //   // this.errors = err;
        //   this.isSubmitting = false;
        // }
        data => {
          console.log(data);
          this.currentUser = data;
        }
      );

  }

  // enableEdit() {
  //
  //   if (this.profileForm.enabled) {
  //     this.profileForm.disable();
  //     this.EDL = 'Lock';
  //   } else {
  //     this.profileForm.enable();
  //     this.EDL = 'Edit';
  //   }
  //
  // }


}
