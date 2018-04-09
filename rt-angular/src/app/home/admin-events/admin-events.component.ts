import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EventsService} from '../../shared/services/events.service';
import { AdminEventModel } from '../../shared/models/admin-event.model';
import {UploadFileService} from '../../shared/services/uploadFile.service';
import {FileUpload} from '../../shared/models/fileupload';

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
  progress: {percentage: number} = {percentage: 0};
  // @ViewChild('EventImg') EventImg;
  // @ViewChild('EventTrc') EventTrc;
  // eventImageFile: File;
  // eventTrackFile: File;
  constructor(private fb: FormBuilder, private eventsService: EventsService, private uploadService: UploadFileService ) {
    this.createEventForm = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      // 'event_img': [null],
      'location': ['', Validators.required],
      'date': ['', Validators.required],
      'startTime': ['', Validators.required],
      'endTime': ['', Validators.required],
      'event_track': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  submitForm() {
    const createEventValues = this.createEventForm.value;
    // console.log(createEventValues.event_img);
    // const Image = this.EventImg.nativeElement;
    // if (Image.files && Image.files[0]) {
    //   this.eventImageFile = Image.files[0];
    // }
    // const ImageFile: File = this.eventImageFile;
    // console.log(ImageFile);
    // const Track = this.EventTrc.nativeElement;
    // if (Track.files && Track.files[0]) {
    //   this.eventTrackFile = Track.files[0];
    // }
    // const TrackFile: File = this.eventTrackFile;
    // console.log(TrackFile);
    console.log(createEventValues.date);
    console.log(createEventValues.startTime);
    // const formData: FormData = new FormData();
    // formData.append('name', createEventValues.name);
    // formData.append('description', createEventValues.description);
    // // formData.append('image', ImageFile, ImageFile.name);
    // formData.append('location', createEventValues.location);
    // formData.append('date', createEventValues.eventDate);
    // formData.append('startTime', createEventValues.startTime);
    // formData.append('endTime', createEventValues.endTime);
    // console.log(formData);
    // // formData.append('trackFile', TrackFile, TrackFile.name);

    this.eventsService.saveEvent(createEventValues).subscribe(
      data => {
        console.log(data);
      }
    );

  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }

}
