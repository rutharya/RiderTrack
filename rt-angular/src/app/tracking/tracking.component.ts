import { Component, OnInit } from '@angular/core';
import {LatestLocationService} from './latest-location.service';
import {TrackingData} from '../shared/models/trackingData';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})


export class TrackingComponent implements OnInit {
  locationData$: Observable<Array<TrackingData>>;
  apiToken: any;

  constructor(private latestLocationService: LatestLocationService) {}

  ngOnInit() {
    this.apiToken = environment.MAPBOX_API_KEY;
    this.getLatestLocation();
    this.latestLocationService.plot(this.locationData$);

  }

  getLatestLocation(): void {
    this.locationData$ = this.latestLocationService.getLatestLocation();
  }

}
