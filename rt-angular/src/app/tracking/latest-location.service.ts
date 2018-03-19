import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LatestLocationService {

  constructor(private http: HttpClient) { }

  getLatestLocation() {
    return this.http.get('http://localhost:3000/getLastLocation?_id=5a99736c0af19f11a392b665').subscribe(data => {
      console.log(data);
    });
  }
}
