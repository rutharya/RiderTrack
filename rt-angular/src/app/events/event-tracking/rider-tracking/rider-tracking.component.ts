import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RiderLocationsService} from "../../../shared/services/rider-locations.service";

@Component({
  selector: 'app-rider-tracking',
  templateUrl:'./rider-tracking.component.html',
  styleUrls: ['./rider-tracking.component.css']
})

export class RiderTrackingComponent implements OnInit {

  public eventName: string;
  public eventDescription: string;
  public eventDate: string;
  public eventTime: string;
  public eventLocation: string;

  constructor(private route: ActivatedRoute, private riderLocationsService: RiderLocationsService) {}

  ngOnInit() {
    console.log('rider tracking component initialized');
    this.route.params.subscribe(params => {
      this.eventName = params["eventName"];
      this.eventDescription = params["eventDescription"];
      this.eventDate = params["eventDate"];
      this.eventLocation = params["eventLocation"];
      this.eventTime = params["eventTime"];
    });

    this.riderLocationsService.plot();
  }

}
