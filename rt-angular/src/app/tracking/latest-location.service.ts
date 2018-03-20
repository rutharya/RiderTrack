import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LatestLocationService {

  constructor(private _http: HttpClient) { }

  getLatestLocation(): Observable<any> {
    return this._http.get('http://localhost:3000/tracking?id=5a99736c0af19f11a392b665').map(result => result);
  }
}
