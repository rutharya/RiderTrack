import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LatestLocationService} from "../../../shared/services/latest-location.service";
import {TrackingData} from "../../../shared/models/trackingData";

@Component({
  selector: 'app-event-detail',
  templateUrl:'./event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})

export class EventDetailComponent implements OnInit {
  // @Input() event: any;
  public eventName: string;
  public eventDescription: string;
  public eventDate: string;
  public eventTime: string;
  public eventLocation: string;

  locationData$: TrackingData[];

  constructor(private route: ActivatedRoute, private latestLocationService: LatestLocationService){

  }

  ngOnInit(){
    //this.eventName = "hii";
    this.route.params.subscribe(params => {
      this.eventName = params["eventName"];
      this.eventDescription = params["eventDescription"];
      this.eventDate = params["eventDate"];
      this.eventLocation = params["eventLocation"];
      this.eventTime = params["eventTime"];
    });
    //this.getLatestLocation();
  }

  /*getLatestLocation(): void {
    //this.locationData$ = this.latestLocationService.getLatestLocation();
    this.latestLocationService.getLatestLocation().subscribe(locationData => {
      this.locationData$ = locationData;
      this.latestLocationService.plot(this.locationData$);
    });
  }*/
}
