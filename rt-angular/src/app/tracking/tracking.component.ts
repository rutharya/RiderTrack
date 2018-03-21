import { Component, OnInit } from '@angular/core';
import {LatestLocationService} from './latest-location.service';
import {TrackingData} from '../shared/models/trackingData';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  trackingDataArray: TrackingData[];

  constructor(private latestLocationService: LatestLocationService) { }
  //constructor(private http: HttpClient) { }

  ngOnInit() {
    //this.latestLocationService.getLatestLocation().subscribe(
     // trackingData => this.trackingDataArray = trackingData);
    this.latestLocationService.getLatestLocation();
  }

}
