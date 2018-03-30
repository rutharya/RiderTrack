import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-event-detail',
  templateUrl:'./event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})

export class EventDetailComponent implements OnInit {
  // @Input() event: any;
  public eventName: string;
  public eventDescription: string;

  constructor(private route: ActivatedRoute){

  }

  ngOnInit(){
    //this.eventName = "hii";
    this.route.params.subscribe(params => {
      this.eventName = params["eventName"];
      this.eventDescription = params["eventDescription"];
    });

  }
}
