import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RiderLocationsService} from "../../../shared/services/rider-locations.service";
import {RiderData} from "../../../shared/models/riderData.model";
import {Observable} from "rxjs/Rx";
import {EventsService} from "../../../shared/services/events.service";


@Component({
  selector: 'app-rider-tracking',
  templateUrl:'./rider-tracking.component.html',
  styleUrls: ['./rider-tracking.component.css']
})

export class RiderTrackingComponent implements OnInit, OnDestroy {

  public riderId: any;
  public eventId: any;
  public eventName: string;
  public eventDescription: string;
  public eventDate: string;
  public eventTime: string;
  public eventLocation: string;
  private alive: boolean = true;

  riderData$: RiderData[];

  constructor(private route: ActivatedRoute,
              private riderLocationsService: RiderLocationsService,
              private eventsService: EventsService) {}

  ngOnInit() {
    console.log('rider tracking component initialized');
    this.route.params.subscribe(params => {
      this.eventId = params["eventid"];
      this.riderId = params["riderid"];
      console.log("EventId: "+this.eventId);
      console.log("RiderId: "+this.riderId);

      //getting data from the events api
      this.eventsService.getEventsById(this.eventId).subscribe(eventsData=>{
        this.eventName = eventsData.name;
        this.eventDescription = eventsData.description;
        this.eventDate = eventsData.date;
        this.eventTime = eventsData.time;
        this.eventLocation = eventsData.location;
      });

      this.riderLocationsService.loadMap();
      this.getRiderLocation(this.eventId, this.riderId);
      Observable.interval(1 * 60 * 1000).takeWhile(() => this.alive).subscribe(x => {
        this.getRiderLocation(this.eventId,this.riderId);
      });
    });

    //************* Live tracking code ************************
    /*this.getRiderLocation();
    this.riderLocationsService.loadMap();
    Observable.interval(2 * 60 * 1000).subscribe(x => {
      this.getRiderLocation();
    });*/
  }

  getRiderLocation(eventId, riderId):void{
    this.riderLocationsService.getRiderLocations(eventId,riderId).subscribe(riderData=>{
      this.riderData$ = riderData;
      this.riderLocationsService.plot(this.riderData$);
    })
  }

  ngOnDestroy(): void {
    console.log("Rider Tracking Destroyed");
    this.alive = false;
  }


}
