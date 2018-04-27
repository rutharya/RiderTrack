import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {TrackingData} from '../models/trackingData';
import {TrackingDataDmass} from '../models/trackingDataDmass';
import {environment} from "../../../environments/environment";
import {ApiService} from "./api.service";

declare var omnivore: any;
declare var L: any;
var Lmap;

@Injectable()
export class LatestLocationService {
  apiAddress: string;
  apiToken: any;
  markersLayer: any;

  constructor(private http: HttpClient,
              private apiService: ApiService) {
    // this.apiAddress = environment.api_url+'/test/getLastLocation?_id=';
    this.apiAddress = environment.api_url+'/test/getLastLocation?_id=';
    this.apiToken = environment.MAPBOX_API_KEY;
  }

  getLatestLocationDMASS(eventId): Observable<Array<TrackingDataDmass>> {
    return this.apiService.get('/tracking/eventDMASS/' + eventId);
  }

  getLatestLocation(eventId): Observable<Array<TrackingData>> {
    return this.http.get<Array<TrackingData>>(this.apiAddress+eventId);
  }

  loadMap(initCoordsLat, initCoordsLng, endCoordsLat, endCoordsLng, trackFile){
    //Lmap = L.map('map').setView([33.42192543, -111.92350757], 11);
    Lmap = L.map('map').setView([initCoordsLat,initCoordsLng], 11);
    Lmap.maxZoom = 100;
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
      ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 50,
      id: 'mapbox.streets',
      accessToken: this.apiToken
    }).addTo(Lmap);

    const myStyle = {
      'color': '#3949AB',
      'weight': 5,
      'opacity': 0.95
    };

    const customLayer = L.geoJson(null, {
      style: myStyle
    });

    const gpxLayer = omnivore.gpx(trackFile, null, customLayer)
      .on('ready', function() {
        Lmap.fitBounds(gpxLayer.getBounds());
      }).addTo(Lmap);

    var startIcon = L.icon({
        iconUrl: '../../assets/Image/start-icon.png',
        iconSize: [30, 55],
        iconAnchor: [15, 55],
        popupAnchor: [0, -46],
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
      });
    L.marker([initCoordsLat, initCoordsLng],{icon: startIcon}).addTo(Lmap);

    var endIcon = L.icon({
      iconUrl: '../../assets/Image/end-icon.png',
      iconSize: [30, 55],
      iconAnchor: [2, 55],
      popupAnchor: [0, -46],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });
    L.marker([endCoordsLat, endCoordsLng],{icon: endIcon}).addTo(Lmap);


    this.markersLayer = new L.LayerGroup();
    this.markersLayer.addTo(Lmap);
  }

  plot(locationData: any, riderNames:any): void{
    this.markersLayer.clearLayers();

    var myIcon = L.icon({
      iconUrl: '../../assets/Image/marker-icon.png',
      iconSize: [30, 55],
      iconAnchor: [15, 55],
      popupAnchor: [0, -46],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });
    /*var i=0;
    for (var data of locationData) {
      console.log(data.latestcoordinates.lat);
      var marker = L.marker([data.latestcoordinates.lat, data.latestcoordinates.lng],{icon: myIcon});
      marker.bindPopup('<b>'+ riderNames[i].riderUsername +'</b><br>' + 'Lat: '+ data.latestcoordinates.lat + ' Lng: '+ data.latestcoordinates.lng);
      this.markersLayer.addLayer(marker);
      i++;
      marker.on('mouseover', function(e) {
        this.openPopup();
      });
      marker.on('mouseout', function(e) {
        this.closePopup();
      });
    }*/

    for (var data of locationData) {
      for(var i=0; i<riderNames.length; i++){
        if(riderNames[i].riderId == data.riderid){
          console.log(data.latestcoordinates.lat);
          var marker = L.marker([data.latestcoordinates.lat, data.latestcoordinates.lng],{icon: myIcon});
          marker.bindPopup('<b>'+ riderNames[i].riderUsername +'</b><br>' + 'Lat: '+ data.latestcoordinates.lat + ' Lng: '+ data.latestcoordinates.lng);
          this.markersLayer.addLayer(marker);
          i++;
          marker.on('mouseover', function(e) {
            this.openPopup();
          });
          marker.on('mouseout', function(e) {
            this.closePopup();
          });
          break;
        }
      }
    }
  }
}
