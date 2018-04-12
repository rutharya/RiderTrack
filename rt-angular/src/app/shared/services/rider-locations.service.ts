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
  markersLayer: any;

  constructor(private http: HttpClient) {
    //this.apiAddress = 'http://localhost:3000/test/getRiderLocation?eventid=5a99736c0af19f11a392b665&riderid=5a9978cd0af19f11a392b666'; //Change the url as required
    this.apiAddress = environment.api_url+'/test/getRiderLocation?';
    this.apiToken = environment.MAPBOX_API_KEY;
  }

  getRiderLocations(eventId,riderId): Observable<Array<RiderData>>{
    return this.http.get<Array<RiderData>>(this.apiAddress+"eventid="+eventId+"&riderid="+riderId);
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
    this.markersLayer = new L.LayerGroup();
    this.markersLayer.addTo(this.map);
  }

  plot(riderData: any): void{
    for (var data1 of riderData) {
      console.log(data1.lat);
    }
    /*var map = L.map('map').setView([33.42192543, -111.92350757], 11);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
      ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: this.apiToken
    }).addTo(map);*/

    this.markersLayer.clearLayers();

    var myIcon = L.icon({
      iconUrl: '../../assets/Image/marker-icon.png',
      iconSize: [30, 55],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });

    var currentPositionIcon = L.icon({
      iconUrl: '../../assets/Image/red-marker.png',
      iconSize: [40, 55],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });

    /*for (var data of riderData) {
      //console.log(data.lat);
      var marker = L.marker([data.lat, data.lng],{icon: myIcon});
      marker.bindPopup('<b>'+ data.timestamp +'</b><br>' + 'Lat: '+ data.lat + 'Lng: '+ data.lng).openPopup();
      this.markersLayer.addLayer(marker);
      //marker.addTo(this.map)
    }*/
    var i;
    for(i=0; i<riderData.length-1; i++){
      var marker = L.marker([riderData[i].lat, riderData[i].lng],{icon: myIcon}).addTo(this.map);
      marker.bindPopup('<b>'+ riderData[i].timestamp +'</b><br>' + 'Lat: '+ riderData[i].lat + 'Lng: '+ riderData[i].lng).openPopup();
      this.markersLayer.addLayer(marker);
    }
    var marker = L.marker([riderData[i].lat, riderData[i].lng],{icon: currentPositionIcon}).addTo(this.map);
    marker.bindPopup('<b>'+ riderData[i].timestamp +'</b><br>' + 'Lat: '+ riderData[i].lat + 'Lng: '+ riderData[i].lng).openPopup();
    this.markersLayer.addLayer(marker);
  }
}
