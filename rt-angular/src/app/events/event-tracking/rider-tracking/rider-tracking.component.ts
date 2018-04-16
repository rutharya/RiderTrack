import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RiderLocationsService} from "../../../shared/services/rider-locations.service";
import {RiderData} from "../../../shared/models/riderData.model";
import {Observable} from "rxjs/Rx";
import {EventsService} from "../../../shared/services/events.service";
import {RiderDataDmass} from "../../../shared/models/riderDataDmass.model";
import {MapService} from "../../../shared/services/maps.service";

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
  public eventStartTime: string;
  public eventEndTime: string;
  public eventLocation: string;
  private alive: boolean = true;

  riderData$: RiderData[];
  riderData$$: RiderDataDmass;

  constructor(private route: ActivatedRoute,
              private riderLocationsService: RiderLocationsService,
              private eventsService: EventsService,
              private mapService:MapService) {}

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
        this.eventStartTime = eventsData.startTime;
        this.eventEndTime = eventsData.endTime;
        this.eventLocation = eventsData.location;
      });

      this.riderLocationsService.loadMap();
      // this.mapService.plotActivity();
      /*this.getRiderLocation(this.eventId, this.riderId);
      Observable.interval(1 * 60 * 1000).takeWhile(() => this.alive).subscribe(x => {
        this.getRiderLocation(this.eventId,this.riderId);
      });*/
    });

  }

  getRiderLocation(eventId, riderId):void{
    this.riderLocationsService.getRiderLocationsDMASS(eventId,riderId).subscribe(riderData=>{
      // this.riderData$ = riderData;
      this.riderData$$ = riderData;
      this.riderLocationsService.plot(this.riderData$$.gps_stats);
    })
  }

  ngOnDestroy(): void {
    console.log("Rider Tracking Destroyed");
    this.alive = false;
  }


}
