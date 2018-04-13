import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Errors} from "../../shared/models";
import {UserService} from "../../shared/services";
import * as toastr from 'toastr';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit {

  page_title: String = '';
  forgotPwdForm: FormGroup;
  isSubmitting = false;
  errors: Errors = {errors: {}};

  constructor(private userService: UserService,
              private fb: FormBuilder) {
    this.forgotPwdForm = this.fb.group({
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
    const credentials = this.forgotPwdForm.value;
    console.log(credentials);
    //TODO: add success message on angular front end to show that password reset email has been sent.
    this.userService.generate_new_pwd(credentials).subscribe( data => {
      console.log(data);
      toastr.warning('recovery email sent');
      //TODO: redirect the user to login component?
    }, err => {
      toastr.error(`Invalid email address : ${err}`);
    });
  }

}
