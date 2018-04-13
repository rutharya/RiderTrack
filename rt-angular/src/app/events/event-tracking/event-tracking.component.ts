import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TrackingData} from "../../shared/models/trackingData";
import {LatestLocationService} from "../../shared/services/latest-location.service";
import {EventsService} from "../../shared/services/events.service";

@Component({
  selector: 'app-event-tracking',
  templateUrl:'./event-tracking.component.html',
  styleUrls: ['./event-tracking.component.css']
})

export class EventTrackingComponent implements OnInit {

  public eventId: any;
  public eventName: string;
  public eventDescription: string;
  public eventDate: string;
  public eventTime: string;
  public eventLocation: string;

  locationData$: TrackingData[];

  constructor(private route: ActivatedRoute,
              private latestLocationService: LatestLocationService,
              private eventsService: EventsService){ }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.eventId = params["id"];
      console.log("EventId: "+this.eventId);

      //getting data from the events api
      this.eventsService.getEventsById(this.eventId).subscribe(eventsData=>{
        this.eventName = eventsData.name;
        this.eventDescription = eventsData.description;
        this.eventDate = eventsData.date;
        this.eventTime = eventsData.time;
        this.eventLocation = eventsData.location;
      });

      this.latestLocationService.loadMap();
      this.getLatestLocation(this.eventId);
    });

  }

  getLatestLocation(eventId): void {
    this.latestLocationService.getLatestLocation(eventId).subscribe(locationData => {
      this.locationData$ = locationData;
      this.latestLocationService.plot(this.locationData$);
    });
  }
}
