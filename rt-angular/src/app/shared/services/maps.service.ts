import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


const apiToken = environment.MAPBOX_API_KEY;
declare var omnivore: any;
declare var L: any;

const defaultCoords: number[] = [33, -111];
const defaultZoom = 8;

@Injectable()
export class MapService {

  constructor() { }


  plotActivity() {
    const myStyle = {
      'color': '#3949AB',
      'weight': 5,
      'opacity': 0.95
    };

    const map = L.map('map').setView(defaultCoords, defaultZoom);

    map.maxZoom = 100;

    L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 50,
      id: 'mapbox.streets',
      accessToken: apiToken,
    }).addTo(map);

    const customLayer = L.geoJson(null, {
      style: myStyle
    });

    const gpxLayer = omnivore.gpx('../../../assets/gpx/mesa.gpx', null, customLayer)
      .on('ready', function() {
        map.fitBounds(gpxLayer.getBounds());
      }).addTo(map);
  }


  plotRecentActivity(locationData: any) {

    console.log('Plotting most recent activity');
    const myStyle = {
      'color': '#3949AB',
      'weight': 5,
      'opacity': 0.95
    };


    const map = L.map('map1').setView(defaultCoords, defaultZoom);

    map.maxZoom = 100;
    L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 20,
      id: 'mapbox.streets',
      accessToken: apiToken,
    }).addTo(map);



    const latlngs = [];


    const myIcon = L.icon({
      iconUrl: '../../assets/Image/marker-icon.png',
      iconSize: [30, 55],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });



    console.log('The data received is:' + locationData);
    for (const data of locationData) {
      console.log(data.lat + ' and ' + data.lng);
          latlngs.push([data.lat, data.lng]);

    }



    const polyline = L.polyline(latlngs, {color: '#ffa500', weight: 10, lineCap: 'round', stroke: true}).addTo(map);
// zoom the map to the polyline
    map.fitBounds(polyline.getBounds());


  }

}
