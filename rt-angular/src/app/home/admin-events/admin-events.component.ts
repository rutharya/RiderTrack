import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EventsService} from '../../shared/services/events.service';
import { AdminEventModel } from '../../shared/models/admin-event.model';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})

export class AdminEventsComponent implements OnInit {

  createEventForm: FormGroup;
  adminEvent: AdminEventModel = {} as AdminEventModel;
  // @ViewChild('EventImg') EventImg;
  @ViewChild('EventTrc') EventTrc;
  // eventImageFile: File;
  eventTrackFile: File;
  constructor(private fb: FormBuilder, private eventsService: EventsService) {
    this.createEventForm = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      // 'event_img': [null],
      'location': ['', Validators.required],
      'eventDate': ['', Validators.required],
      'startTime': ['', Validators.required],
      'endTime': ['', Validators.required]
      // 'event_track': [null]
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
    console.log(createEventValues.eventDate);
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

}
