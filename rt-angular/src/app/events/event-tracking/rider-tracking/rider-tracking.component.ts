import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RiderLocationsService} from "../../../shared/services/rider-locations.service";
import {RiderData} from "../../../shared/models/riderData.model";
import {Observable} from "rxjs/Rx";
import {EventsService} from "../../../shared/services/events.service";
import {RiderDataDmass} from "../../../shared/models/riderDataDmass.model";
import {StatisticsService} from "../../../shared/services";
import {UserService} from "../../../shared/services/user.service";



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
  public averagespeed: string;
  public lastspeed: string;
  public currentelevation: string;
  public elapsedtime: string;
  public totaldistance: string;
  public riderUsername: string;

  riderData$: RiderData[];
  riderData$$: RiderDataDmass;

  constructor(private route: ActivatedRoute,
              private riderLocationsService: RiderLocationsService,
              private eventsService: EventsService,
              private userService: UserService,
              private statsService: StatisticsService) {}

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
        this.riderLocationsService.loadMap(eventsData.startLocation.lat,eventsData.startLocation.long);
      });

      this.userService.getUsername(this.riderId).subscribe(rider=> {
        this.riderUsername = rider.username;
      });
      //this.riderLocationsService.loadMap(this.startLocationLat,this.startLocationLng);
      this.getRiderLocation(this.eventId, this.riderId);
      this.getLatestStats(this.eventId, this.riderId);
      Observable.interval(1 * 60 * 1000).takeWhile(() => this.alive).subscribe(x => {
        this.getRiderLocation(this.eventId,this.riderId);
        this.getLatestStats(this.eventId,this.riderId);
      });
    });

  }

  getRiderLocation(eventId, riderId):void{
    this.riderLocationsService.getRiderLocationsDMASS(eventId,riderId).subscribe(riderData=>{
      // this.riderData$ = riderData;
      this.riderData$$ = riderData;
      this.riderLocationsService.plot(this.riderData$$.gps_stats);
    })
  }


  getLatestStats(eventId, riderId):void{
    console.log("Event stats inside the getlatest corrd");
    this.statsService.getEventStats(eventId, riderId).subscribe(res=> {
      console.log("The latest stats returned is "+res);
      const stats = res['statistics'];
      this.lastspeed =stats.lastspeed;
      this.averagespeed = stats.averagespeed;
      this.currentelevation = stats.currentelevation;
      this.totaldistance = stats.totaldistance;
      this.elapsedtime = stats.elapsedtime;
      console.log("Event stats called"+this.lastspeed+" and "+this.currentelevation+" and "+this.averagespeed+" and "+this.totaldistance+" and "+this.elapsedtime);
    });
  }

  ngOnDestroy(): void {
    console.log("Rider Tracking Destroyed");
    this.alive = false;
  }


}
