import { Component, OnInit } from '@angular/core';
import {Errors} from '../shared/models';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../shared/services';
import * as toastr from 'toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
        this.authForm.addControl('admin', new FormControl());
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};
    const credentials = this.authForm.value;
    this.userService
      .attemptAuth(this.authType, credentials)
      .subscribe(
        data => {
          toastr.options.timeOut = 1000;
          toastr.success('Login successful');
          // redirecting user to their home page.
          this.router.navigateByUrl('/home');
        },
        err => {
          toastr.options.timeOut = 1000;
          toastr.error(`ERROR: ${err}`);
          this.errors = err;
          this.isSubmitting = false;
        }
      );
  }

}
