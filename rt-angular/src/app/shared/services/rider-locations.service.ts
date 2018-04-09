import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {environment} from "../../../environments/environment";
import {RiderData} from "../models/riderData.model";


declare var omnivore: any;
declare var L: any;

@Injectable()
export class RiderLocationsService {
  apiAddress: string;
  apiToken: any;
  map:any;

  constructor(private http: HttpClient) {
    this.apiAddress = 'https://athlete-tracker.herokuapp.com/test/getRiderLocation?eventid=5a9536fad047af0030c25018&riderid=5ab6ed215fd006001b7960ff'; //Change the url as required
    this.apiToken = environment.MAPBOX_API_KEY;
  }

  getRiderLocations(): Observable<Array<RiderData>>{
    return this.http.get<Array<RiderData>>(this.apiAddress);
  }

  loadMap(){
    this.map = L.map('map').setView([33.42192543, -111.92350757], 11);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
      ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: this.apiToken
    }).addTo(this.map);
  }

  plot(riderData: any): void{
    /*var map = L.map('map').setView([33.42192543, -111.92350757], 11);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
      ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: this.apiToken
    }).addTo(map);*/

    var myIcon = L.icon({
      iconUrl: '../../assets/Image/marker-icon.png',
      iconSize: [30, 55],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });

    for (var data of riderData) {
      console.log(data.lat);
      var marker = L.marker([data.lat, data.lng],{icon: myIcon}).addTo(this.map);
      marker.bindPopup('<b>'+ data.timestamp +'</b><br>' + 'Lat: '+ data.lat + 'Lng: '+ data.lng).openPopup();
    }
  }
}
