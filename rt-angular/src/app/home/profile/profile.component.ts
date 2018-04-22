import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../shared/services';
import {User} from '../../shared/models';
import {HeaderComponent} from '../../shared/layout';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {matchOtherValidator} from './match-other-validator';
import * as toastr from 'toastr';
import {FileUpload} from '../../shared/models/fileupload';
import {UploadFileService} from '../../shared/services/uploadFile.service';
import {Observable} from "rxjs/Observable";

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
  timerSubscription : any;
  profileSubscription : any;
  selectedImageFiles: FileList;
  currentImageFileUpload: FileUpload;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder, private uploadService: UploadFileService) {
    this.profileForm = this.fb.group({
      bio: '',
      email: '',
      firstName: '',
      lastName: '',
      height: '',
      weight: '',
      phoneNo: '',
      address: '',
      image: ''
    });
  }

  ngOnInit() {
    // Object.assign(this.user, this.userService.getCurrentUser());
    // this.userService.getCurrentUserSub().subscribe(usr => {
    //   this.currentUser = usr;
    //   // this.refreshData();
    // });
    // // this.EDL = 'Edit';
    // console.log('value of this .Cuser');
    // console.log(this.currentUser);
    this.currentUser = this.userService.getCurrentUser();
    console.log(this.currentUser);
    // this.profileForm.patchValue(this.currentUser);
  }

  submitForm() {
    console.log('in submit form');
    console.log(this.profileForm.get('gender'));
    console.log(this.profileForm.status);
    console.log(this.user);

    const profileFormValue = this.profileForm.value;
    if(this.currentImageFileUpload){
      profileFormValue.image = this.currentImageFileUpload.url;
    }

    // this.profileForm.image = this.currentImageFileUpload.url;
    this.isSubmitting = true;
    // this.userService.getCurrentUserSub().subscribe(usr => {
    //   this.currentUser = usr;
    //   // this.refreshData();
    // });

    this.userService.update(this.profileForm.value)
      .subscribe(updatedUser => {
        console.log('updated user');
        console.log(updatedUser);
        // this.currentUser = updatedUser;
        // this.refreshData();
      },err => {
        console.log(err);
      });

    // this.userService
    //   .update(this.profileForm.value)
    //   .subscribe(
    //     // updatedUser => this.router.navigateByUrl('/home/profile'),
    //     // err => {
    //     //   // this.errors = err;
    //     //   this.isSubmitting = false;
    //     // }
    //     data => {
    //       console.log(data);
    //       this.currentUser = data;
    //       this.router.navigateByUrl('/home');
    //       toastr.success('Profile updated!');
    //     },
    //     err => {
    //       toastr.error('Cannot Update the profile try again');
    //     }
    //   );

  }

  // private refreshData(): void {
  //   this.profileSubscription = this.userService.getCurrentUserSub().subscribe(data => {
  //       this.currentUser = data;
  //       this.subscribeToData();
  //   });
  // }
  //
  // private subscribeToData(): void {
  //   this.timerSubscription = Observable.timer(5000).first().subscribe(() => this.refreshData());
  // }


  selectImageFile(event) {
    this.selectedImageFiles = event.target.files;
  }
  uploadImage() {
    const file = this.selectedImageFiles.item(0);
    this.currentImageFileUpload = new FileUpload(file);
    this.currentImageFileUpload.url = this.uploadService.pushProfileImageFileToStorage(this.currentImageFileUpload);
    // console.log('Upload');
    // console.log(this.currentFileUpload.url);
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
