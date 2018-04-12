import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {TrackingData} from '../models/trackingData';
import {environment} from "../../../environments/environment";
import {ApiService} from "./api.service";


declare var omnivore: any;
declare var L: any;

@Injectable()
export class LatestLocationService {
  apiAddress: string;
  apiToken: any;

  constructor(private http: HttpClient,private apiService: ApiService) {
    this.apiAddress = environment.api_url+'/test/getLastLocation?_id=';
    this.apiToken = environment.MAPBOX_API_KEY;
  }

  getLatestLocation(eventId): Observable<Array<TrackingData>> {
    return this.http.get<Array<TrackingData>>(this.apiAddress+eventId);
  }


  plot(locationData: any): void{
    const myStyle = {
      'color': '#3949AB',
      'weight': 5,
      'opacity': 0.95
    };
    var map = L.map('map').setView([33.42192543, -111.92350757], 11);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
      ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: this.apiToken
    }).addTo(map);

    var myIcon = L.icon({
      iconUrl: '../../assets/Image/marker-icon.png',
      iconSize: [30, 55],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });

    for (var data of locationData) {
      console.log(data.coordinates.lat);
      var marker = L.marker([data.coordinates.lat, data.coordinates.lng],{icon: myIcon}).addTo(map);
      marker.bindPopup('<b>'+ data.riderName +'</b><br>' + 'Lat: '+ data.coordinates.lat + 'Lng: '+ data.coordinates.lng).openPopup();
    }
  }
}
