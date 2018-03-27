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
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'image': ['', Validators.required],
      'location': ['', Validators.required],
      'eventDate': ['', Validators.required],
      'startTime': ['', Validators.required],
      'endTime': ['', Validators.required],
      'fileTrack': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  submitForm() {
    const createEventValues = this.createEventForm.value;
    console.log(createEventValues);
  }

}
