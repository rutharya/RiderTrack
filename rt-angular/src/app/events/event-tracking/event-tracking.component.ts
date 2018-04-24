import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TrackingData} from "../../shared/models/trackingData";
import {LatestLocationService} from "../../shared/services/latest-location.service";
import {EventsService} from "../../shared/services/events.service";
import {TrackingDataDmass} from "../../shared/models/trackingDataDmass";
import {UserService} from "../../shared/services/user.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-event-tracking',
  templateUrl:'./event-tracking.component.html',
  styleUrls: ['./event-tracking.component.css']
})

export class EventTrackingComponent implements OnInit {

  private alive: boolean = true;
  public eventId: any;
  public eventName: string;
  public eventDescription: string;
  public eventDate: string;
  public eventStartTime: string;
  public eventEndTime: string;
  public eventLocation: string;
  public foundRiders: Rider[];
  riderSearchTerm = '';
  rider: Rider[] = [];
  locationData$: TrackingData[];
  locationData$$: TrackingDataDmass[];

  constructor(private route: ActivatedRoute,
              private latestLocationService: LatestLocationService,
              private eventsService: EventsService,
              private userService: UserService){ }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.eventId = params["id"];
      console.log("EventId: "+this.eventId);

      //getting data from the events api
      this.eventsService.getEventsById(this.eventId).subscribe(eventsData=>{
        this.eventName = eventsData.name;
        this.eventDescription = eventsData.description;
        this.eventDate = eventsData.date;
        this.eventStartTime = eventsData.startTime;
        this.eventEndTime = eventsData.endTime;
        this.eventLocation = eventsData.location;
        this.latestLocationService.loadMap(eventsData.startLocation.lat,eventsData.startLocation.long,eventsData.trackFile);
      });

      //this.latestLocationService.loadMap();
      this.getLatestLocation(this.eventId);
      Observable.interval(0.5 * 60 * 1000).takeWhile(() => this.alive).subscribe(x => {
        this.getLatestLocation(this.eventId);
      });
    });

  }

  searchRiders(searchTerm) {
  console.log(searchTerm);
  const term = searchTerm.toLocaleLowerCase();
  this.foundRiders = this.rider.filter(x => x.riderUsername.toLocaleLowerCase().indexOf(term) > -1);
  console.log(this.foundRiders);
  }

  getLatestLocation(eventId): void {
    this.latestLocationService.getLatestLocationDMASS(eventId).subscribe(locationData => {
      //this.locationData$ = locationData;
      this.locationData$$ = locationData;
      //this.latestLocationService.plot(this.locationData$$);
      this.rider = [];
      this.foundRiders=[];
      for(var i=0; i<this.locationData$$.length; i++){
        this.userService.getUsername(this.locationData$$[i].riderid).subscribe(rider=>{
          this.rider.push({
            riderId: rider._id,
            riderUsername: rider.username
          });
          this.foundRiders.push({
            riderId: rider._id,
            riderUsername: rider.username
          });
          if(this.rider.length == this.locationData$$.length){
            this.latestLocationService.plot(this.locationData$$,this.rider);
          }
        });
      }
    });

  }

  ngOnDestroy(): void {
    console.log("Event Tracking Destroyed");
    this.alive = false;
  }
}



interface Rider{
  riderId ?: string;
  riderUsername ?: string;
}
