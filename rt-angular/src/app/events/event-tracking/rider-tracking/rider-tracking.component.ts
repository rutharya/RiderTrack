import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RiderLocationsService} from "../../../shared/services/rider-locations.service";
import {RiderData} from "../../../shared/models/riderData.model";
import {Observable} from "rxjs/Rx";


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

  riderData$: RiderData[];

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
    this.getRiderLocation();
    this.riderLocationsService.loadMap();
    Observable.interval(2 * 60 * 1000).subscribe(x => {
      this.getRiderLocation();
    });
  }

  getRiderLocation():void{
    this.riderLocationsService.getRiderLocations().subscribe(riderData=>{
      this.riderData$ = riderData;
      this.riderLocationsService.plot(this.riderData$);
    })
  }

}
