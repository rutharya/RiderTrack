import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {TrackingData} from '../shared/models/trackingData';

@Injectable()
export class LatestLocationService {

  constructor(private http: HttpClient) { }

  getLatestLocation() {
    //return this._http.get('http://localhost:3000/tracking?id=5a99736c0af19f11a392b665').map((response: Response) => response.json());
    this.http.get<TrackingData[]>('http://localhost:3000/getLastLocation?_id=5a99736c0af19f11a392b665').subscribe(data => {
      console.log(data[0].riderid);
    });
  }
}
