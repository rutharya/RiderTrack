import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {environment} from "../../../environments/environment";


declare var omnivore: any;
declare var L: any;

@Injectable()
export class RiderLocationsService {
  apiAddress: string;
  apiToken: any;

  constructor(private http: HttpClient) {
    this.apiAddress = 'http://localhost:3000/test/getRiderLocation?eventid=5a99736c0af19f11a392b665&riderid=5a9973e10af19f11a392b666'; //Change the url as required
    this.apiToken = environment.MAPBOX_API_KEY;
  }

  getRiderLocations(){
    this.http.get(this.apiAddress).subscribe(data => {
      console.log("RRR"+data);
    });
  }

  plot(): void{
    var map = L.map('map').setView([33.42192543, -111.92350757], 11);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
      ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: this.apiToken
    }).addTo(map);
  }
}
