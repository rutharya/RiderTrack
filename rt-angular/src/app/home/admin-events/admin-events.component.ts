import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EventsService} from '../../shared/services/events.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})

export class AdminEventsComponent implements OnInit {

  createEventForm: FormGroup;
  // @ViewChild('EventImg') EventImg;
  // @ViewChild('EventTrc') EventTrc;
  // eventImageFile: File;
  // eventTrackFile: File;
  constructor(private fb: FormBuilder, private eventsService: EventsService) {
    this.createEventForm = this.fb.group({
      'event_name': ['', Validators.required],
      'event_description': ['', Validators.required],
      // 'event_img': [null],
      'event_location': ['', Validators.required],
      'event_date': ['', Validators.required],
      'event_start_time': ['', Validators.required],
      'event_end_time': ['', Validators.required]
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
    const formData: FormData = new FormData();
    formData.append('name', createEventValues.event_name);
    formData.append('description', createEventValues.event_description);
    // formData.append('image', ImageFile, ImageFile.name);
    formData.append('location', createEventValues.event_location);
    formData.append('date', createEventValues.event_date);
    formData.append('startTime', createEventValues.event_start_time);
    formData.append('endTime', createEventValues.event_end_time);
    // formData.append('trackFile', TrackFile, TrackFile.name);

    this.eventsService.saveEvent(formData).subscribe(
      data => {
        console.log(data);
      }
    );
  }

}
