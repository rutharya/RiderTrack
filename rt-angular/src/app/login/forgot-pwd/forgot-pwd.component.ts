import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Errors} from "../../shared/models";
import {UserService} from "../../shared/services";

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit {

  page_title: String = '';
  authForm: FormGroup;
  isSubmitting = false;
  errors: Errors = {errors: {}};

  constructor(private userService: UserService,
              private fb: FormBuilder) {
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
    });
  }

  ngOnInit() {
    this.page_title="forgot your password?";
    // this.authForm.addControl(name:'email', new FormControl(()));
  }


  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};
    console.log("SUBMITTING FORM");
    const credentials = this.authForm.value;
    console.log(credentials);
    //TODO: (ruthar) BUG - not sure why this is not submitting the form.
    this.userService.generate_new_pwd(credentials);
  }
  //   this.userService
  //     .attemptAuth(this.authType, credentials)
  //     .subscribe(
  //       data => this.router.navigateByUrl('/home'),//redirecting user to their home page.
  //       err => {
  //         this.errors = err;
  //         this.isSubmitting = false;
  //       }
  //     );
  // }


}
