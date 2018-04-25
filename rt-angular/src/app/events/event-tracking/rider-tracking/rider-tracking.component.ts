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
  public currentelevation: string;
  public elapsedtime: string;
  public totaldistance: string;
  public riderUsername: string;
  public updatedat: any;

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
        this.riderLocationsService.loadMap(eventsData.startLocation.lat,eventsData.startLocation.long, eventsData.endLocation.lat, eventsData.endLocation.long, eventsData.trackFile);
        this.averagespeed = "0.0";
        this.totaldistance = "0.0";
        this.elapsedtime = "0";
        this.currentelevation = "0";
      });

      this.userService.getUsername(this.riderId).subscribe(rider=> {
        this.riderUsername = rider.username;
      });
      //this.riderLocationsService.loadMap(this.startLocationLat,this.startLocationLng);
      this.getRiderLocation(this.eventId, this.riderId);
      this.getLatestStats(this.eventId, this.riderId);
      Observable.interval(0.1 * 60 * 1000).takeWhile(() => this.alive).subscribe(x => {
        this.getRiderLocation(this.eventId,this.riderId);
        this.updatedat = new Date();
        console.log("In individual tracking"+this.updatedat);
        this.getLatestStats(this.eventId,this.riderId);
      });
    });

  }

  getRiderLocation(eventId, riderId):void{
    this.riderLocationsService.getRiderLocationsDMASS(eventId,riderId).subscribe(riderData=>{
      // this.riderData$ = riderData;
      this.riderData$$ = riderData;
      this.riderLocationsService.plot(this.riderData$$.gps_stats);
      this.updatedat = new Date(this.riderData$$.gps_stats[this.riderData$$.gps_stats.length -1].timestamp);
      if(this.riderData$$.completed == true)
        this.alive = false;
    })
  }


  getLatestStats(eventId, riderId):void{
    console.log("Event stats inside the getlatest corrd");
    this.statsService.getEventStats(eventId, riderId).subscribe(res=> {
      console.log("The latest stats returned is "+res);
      const stats = res['statistics'];
      this.averagespeed = stats.averagespeed;
      this.currentelevation = stats.currentelevation;
      this.totaldistance = stats.totaldistance;
      this.elapsedtime = stats.elapsedtime;
      console.log("Event stats called"+ " and "+this.currentelevation+" and "+this.averagespeed+" and "+this.totaldistance+" and "+this.elapsedtime);
    });
  }

  ngOnDestroy(): void {
    console.log("Rider Tracking Destroyed");
    this.alive = false;
  }


}
