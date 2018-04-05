import { Component, OnInit } from '@angular/core';
import {TrackingData} from '../shared/models/trackingData';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {LatestLocationService} from "../shared/services/latest-location.service";

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})


export class TrackingComponent implements OnInit {

  locationData$: TrackingData[];

  constructor(private latestLocationService: LatestLocationService) {}

  ngOnInit() {
    this.getLatestLocation();
  }

  getLatestLocation(): void {
    //this.locationData$ = this.latestLocationService.getLatestLocation();
    this.latestLocationService.getLatestLocation().subscribe(locationData => {
      this.locationData$ = locationData;
      this.latestLocationService.plot(this.locationData$);
    });
  }

}
