import { Component, OnInit } from '@angular/core';
import {StatisticsService} from "../../../shared/services";
import {MapService} from "../../../shared/services/maps.service";

@Component({
  selector: 'app-lastrun-summary',
  templateUrl: './lastrun-summary.component.html',
  styleUrls: ['./lastrun-summary.component.css']
})
export class LastrunSummaryComponent implements OnInit {

  //activity: any;
  public eventname = "";
  public eventlocation = "";
  public eventdate = "";
  public totaldistance = "";
  public elapsedtime = "-";
  public avgspeed = "";
  public altitdue = "";
  //public gpsstats = [];


  constructor(private statisticsService: StatisticsService, private _mapService: MapService) {
    console.log('constructor called');
  }

  ngOnInit() {

    console.log("init stat service");
    this.statisticsService.getLatestEvent()
      .subscribe(res => {
        console.log(res);
        if(res === [] || res === undefined){
          // this.activity = [];

        }
        else {
          //this.activity = res['activity'];
          this.eventname = res['eventinfo'].eventname;
          this.eventlocation = res['eventinfo'].eventlocation;
          this.eventdate = res['eventinfo'].eventdate;
          this.elapsedtime = res['activity'].racestats.elapsedtime;
          this.totaldistance = res['activity'].racestats.totaldistance;
          this.avgspeed = res['activity'].racestats.averagespeed;
          this.altitdue = res['activity'].racestats.averageelevation;
          //this.gpsstats = res['activity'].gps_stats;


        }
        //TODO: data received from statistics service -> modify for chart udpate.
        //TODO: remove static data thats encoded for now.

      });//end of subscribe

    this._mapService.plotRecentActivity();
  }

}
