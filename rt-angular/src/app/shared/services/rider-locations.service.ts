import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {environment} from "../../../environments/environment";
import {RiderData} from "../models/riderData.model";
import {ApiService} from "./api.service";
import {RiderDataDmass} from "../models/riderDataDmass.model";


declare var omnivore: any;
declare var L: any;

const defaultCoords: number[] = [40, -80];
const defaultZoom = 8;
var Lmap;

@Injectable()
export class RiderLocationsService {
  apiAddress: string;
  apiToken: any;
  map:any;
  markersLayer: any;

  constructor(private apiService:ApiService,private http: HttpClient) {
    //this.apiAddress = 'http://localhost:3000/test/getRiderLocation?eventid=5a99736c0af19f11a392b665&riderid=5a9978cd0af19f11a392b666'; //Change the url as required
    this.apiAddress = environment.api_url+'/test/getRiderLocation?';
    this.apiToken = environment.MAPBOX_API_KEY;
  }

  getRiderLocationsDMASS(eventId,riderId): Observable<RiderDataDmass>{
    // return this.http.get<Array<RiderData>>(this.apiAddress+"eventid="+eventId+"&riderid="+riderId);
    return this.apiService.get('/tracking/rider/'+eventId+'?riderid='+riderId);
  }

  getRiderLocations(eventId,riderId): Observable<Array<RiderData>>{
    return this.http.get<Array<RiderData>>(this.apiAddress+"eventid="+eventId+"&riderid="+riderId);
  }

  loadMap(initCoordsLat, initCoordsLng, trackFile){
    //this.map = L.map('map').setView([33.42192543, -111.92350757], 11);
    console.log("In loadmap function");
    //console.log("XXX"+initCoordsLat);
    const myStyle = {
      'color': '#3949AB',
      'weight': 5,
      'opacity': 0.95
    };

    // this.map = L.map('map').setView(defaultCoords, defaultZoom);
    // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
    //   ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    //   'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //   maxZoom: 18,
    //   id: 'mapbox.streets',
    //   accessToken: this.apiToken
    // }).addTo(this.map);
    Lmap = L.map('map').setView([initCoordsLat,initCoordsLng], 11);

    Lmap.maxZoom = 100;

    L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: this.apiToken,
    }).addTo(Lmap);
    this.markersLayer = new L.LayerGroup();
    this.markersLayer.addTo(Lmap);

    const customLayer = L.geoJson(null, {
      style: myStyle
    });

    const gpxLayer = omnivore.gpx(trackFile, null, customLayer)
      .on('ready', function() {
        Lmap.fitBounds(gpxLayer.getBounds());
      }).addTo(Lmap);

    /*var myIcon = L.icon({
      iconUrl: '../../assets/Image/marker-icon.png',
      iconSize: [30, 55],
      iconAnchor: [22, 28],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });

    var currentPositionIcon = L.icon({
      iconUrl: '../../assets/Image/red-marker.png',
      iconSize: [40, 55],
      iconAnchor: [22, 28],
      popupAnchor: [-3, -26],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });

    var currentPositionIcon = L.icon({
      iconUrl: '../../assets/Image/red-marker.png',
      iconSize: [40, 55],
      iconAnchor: [22, 28],
      popupAnchor: [-3, -26],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });

    var latlngs = [];

    latlngs.push([43.066748000,-89.305216000]);
    latlngs.push([43.066806000,-89.306505000]);
    latlngs.push([43.066761000,-89.307909000]);
    latlngs.push([43.066426000,-89.308907000]);

    var marker = L.marker(latlngs[0],{icon: myIcon}).addTo(Lmap);
    marker.bindPopup('<b>'+ "15:30:00" +'</b><br>' + 'Lat: '+ latlngs[0][0] + 'Lng: '+ latlngs[0][1]).openPopup();
    marker = L.marker(latlngs[1],{icon: myIcon}).addTo(Lmap);
    marker.bindPopup('<b>'+ "15:30:00" +'</b><br>' + 'Lat: '+ latlngs[1][0] + 'Lng: '+ latlngs[1][1]).openPopup();
    marker = L.marker(latlngs[2],{icon: myIcon}).addTo(Lmap);
    marker.bindPopup('<b>'+ "15:30:00" +'</b><br>' + 'Lat: '+ latlngs[2][0] + 'Lng: '+ latlngs[2][1]).openPopup();
    marker = L.marker(latlngs[3],{icon: currentPositionIcon}).addTo(Lmap);
    marker.bindPopup('<b>'+ "15:30:00" +'</b><br>' + 'Lat: '+ latlngs[3][0] + 'Lng: '+ latlngs[3][1]).openPopup();*/
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
      iconAnchor: [22, 28],
      popupAnchor: [-3, -26],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });

    var currentPositionIcon = L.icon({
      iconUrl: '../../assets/Image/red-marker.png',
      iconSize: [40, 55],
      iconAnchor: [22, 28],
      popupAnchor: [-3, -26],
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
      var marker = L.marker([riderData[i].lat, riderData[i].lng],{icon: myIcon});
      marker.bindPopup('<b>'+ new Date(riderData[i].timestamp).getTime() +'</b><br>' + 'Lat: '+ riderData[i].lat + 'Lng: '+ riderData[i].lng);
      this.markersLayer.addLayer(marker);
      marker.on('mouseover', function(e) {
        this.openPopup();
      });
      marker.on('mouseout', function(e) {
        this.closePopup();
      });
    }
    var marker = L.marker([riderData[i].lat, riderData[i].lng],{icon: currentPositionIcon});
    marker.bindPopup('<b>'+ new Date(riderData[i].timestamp) +'</b><br>' + 'Lat: '+ riderData[i].lat + 'Lng: '+ riderData[i].lng);
    this.markersLayer.addLayer(marker);
    marker.on('mouseover', function(e) {
      this.openPopup();
    });
    marker.on('mouseout', function(e) {
      this.closePopup();
    });
  }
}
