import { Component, OnInit } from '@angular/core';
import {LatestLocationService} from './latest-location.service';
import {TrackingData} from '../shared/models/trackingData';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  locationData$: TrackingData[];

  constructor(private latestLocationService: LatestLocationService) { }
  //constructor(private http: HttpClient) { }

  ngOnInit() {
    //this.latestLocationService.getLatestLocation().subscribe(
     // trackingData => this.trackingDataArray = trackingData);
    //this.latestLocationService.getLatestLocation();
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
