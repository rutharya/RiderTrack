import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {TrackingData} from '../shared/models/trackingData';

@Injectable()
export class LatestLocationService {
  apiAddress: string;
  constructor(private http: HttpClient) {
    this.apiAddress = 'http://localhost:3000/test/getLastLocation?_id=5a99736c0af19f11a392b665'; //Change the url as required
  }

  getLatestLocation(): Observable<Array<TrackingData>> {
    return this.http.get<Array<TrackingData>>(this.apiAddress);
  }

}
