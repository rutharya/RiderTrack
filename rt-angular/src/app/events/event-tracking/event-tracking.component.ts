import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-event-tracking',
  templateUrl:'./event-tracking.component.html',
  styleUrls: ['./event-tracking.component.css']
})

export class EventTrackingComponent implements OnInit {

  constructor(){ }

  ngOnInit(){
    console.log('component initialized');
  }
}
