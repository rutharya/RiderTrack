import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {

  createEventForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createEventForm = this.fb.group({
      'event_name': ['', Validators.required],
      'event_description': ['', Validators.required],
      'event_img': ['', Validators.required],
      'event_location': ['', Validators.required],
      'event_date': ['', Validators.required],
      'event_start_time': ['', Validators.required],
      'event_end_time': ['', Validators.required],
      'event_track': ['']
    });
  }

  ngOnInit() {
  }

  submitForm() {
    const createEventValues = this.createEventForm.value;
    console.log(createEventValues);
  }

}
