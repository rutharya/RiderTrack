import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


const apiToken = environment.MAPBOX_API_KEY;
declare var omnivore: any;
declare var L: any;

const defaultCoords: number[] = [40, -80];
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
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: apiToken
    }).addTo(map);

    const customLayer = L.geoJson(null, {
      style: myStyle
    });

    const gpxLayer = omnivore.gpx('../../../assets/gpx/1.gpx', null, customLayer)
      .on('ready', function() {
        map.fitBounds(gpxLayer.getBounds());
      }).addTo(map);
  }

}
