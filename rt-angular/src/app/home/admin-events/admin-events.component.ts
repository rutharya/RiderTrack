import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EventsService} from '../../shared/services/events.service';
import { AdminEventModel } from '../../shared/models/admin-event.model';
import {UploadFileService} from '../../shared/services/uploadFile.service';
import {FileUpload} from '../../shared/models/fileupload';
import {Router} from '@angular/router';
import * as toastr from 'toastr';


@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})

export class AdminEventsComponent implements OnInit {

  createEventForm: FormGroup;
  adminEvent: AdminEventModel = {} as AdminEventModel;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  selectedImageFiles: FileList;
  currentImageFileUpload: FileUpload;
  progress: {percentage: number} = {percentage: 0};

  constructor(private fb: FormBuilder, private eventsService: EventsService, private uploadService: UploadFileService, private router: Router ) {
    this.createEventForm = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'image': ['', Validators.required],
      'location': ['', Validators.required],
      'date': ['', Validators.required],
      'startTime': ['', Validators.required],
      'endTime': ['', Validators.required],
      'trackFile': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  submitForm() {
    const createEventValues = this.createEventForm.value;
    console.log(createEventValues.date);
    console.log(createEventValues.startTime);

    createEventValues.trackFile = this.currentFileUpload.url;
    createEventValues.image = this.currentImageFileUpload.url;
    this.eventsService.saveEvent(createEventValues).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/home');
        toastr.success('Event Created!');
      },
      err => {
        toastr.error('Cannot create the event try again!');
      }
    );

  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.currentFileUpload = new FileUpload(file);
    this.currentFileUpload.url = this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
    // console.log('Upload');
    // console.log(this.currentFileUpload.url);
  }
  selectImageFile(event) {
    this.selectedImageFiles = event.target.files;
  }

  uploadImage() {
    const file = this.selectedImageFiles.item(0);
    this.currentImageFileUpload = new FileUpload(file);
    this.currentImageFileUpload.url = this.uploadService.pushImageFileToStorage(this.currentImageFileUpload, this.progress);
    console.log('Upload');
    console.log(this.currentFileUpload.url);
  }
}
