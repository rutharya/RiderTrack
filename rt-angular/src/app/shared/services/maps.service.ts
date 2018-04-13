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
      accessToken: apiToken,
    }).addTo(map);

    const customLayer = L.geoJson(null, {
      style: myStyle
    });

    const gpxLayer = omnivore.gpx('../../../assets/gpx/1.gpx', null, customLayer)
      .on('ready', function() {
        map.fitBounds(gpxLayer.getBounds());
      }).addTo(map);
  }


  plotRecentActivity() {

    console.log("Plotting most recent activity");
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



    var latlngs = [];

    var locationData  = [

      {
        "timestamp":"2018-04-11T04:32:44.711Z",
        "lat":37.33527476,
        "lng":-122.03254703,
        "speed":1.67,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:32:45.725Z",
        "lat":37.33525552,
        "lng":-122.03254838,
        "speed":2.03,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:32:46.719Z",
        "lat":37.33523566,
        "lng":-122.03254863,
        "speed":2.23,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:32:47.715Z",
        "lat":37.33521504,
        "lng":-122.03254905,
        "speed":2.14,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:32:48.713Z",
        "lat":37.33519572,
        "lng":-122.0325498,
        "speed":1.94,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:32:49.713Z",
        "lat":37.33517518,
        "lng":-122.03255055,
        "speed":2.41,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:32:50.712Z",
        "lat":37.33515083,
        "lng":-122.03255349,
        "speed":2.89,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:32:51.712Z",
        "lat":37.3351212,
        "lng":-122.03256229,
        "speed":3.64,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:32:52.742Z",
        "lat":37.33507162,
        "lng":-122.0326037,
        "speed":4.47,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:32:53.719Z",
        "lat":37.33503868,
        "lng":-122.03265072,
        "speed":6.37,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:32:54.718Z",
        "lat":37.33500926,
        "lng":-122.03272188,
        "speed":7.74,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:32:55.725Z",
        "lat":37.33497737,
        "lng":-122.03281282,
        "speed":9.18,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:32:56.735Z",
        "lat":37.33494812,
        "lng":-122.0329212,
        "speed":10.78,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:32:57.712Z",
        "lat":37.33492222,
        "lng":-122.03304215,
        "speed":12.11,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:32:58.720Z",
        "lat":37.33489242,
        "lng":-122.03318372,
        "speed":13.66,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:32:59.722Z",
        "lat":37.33485843,
        "lng":-122.03334424,
        "speed":14.82,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:00.723Z",
        "lat":37.33482105,
        "lng":-122.03350886,
        "speed":15.9,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:01.734Z",
        "lat":37.33477977,
        "lng":-122.03369603,
        "speed":17.21,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:02.732Z",
        "lat":37.33474691,
        "lng":-122.03389325,
        "speed":18.27,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:03.734Z",
        "lat":37.33470894,
        "lng":-122.03411085,
        "speed":19.27,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:04.724Z",
        "lat":37.33467638,
        "lng":-122.03432425,
        "speed":20.07,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:05.718Z",
        "lat":37.33464561,
        "lng":-122.03455442,
        "speed":20.91,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:06.758Z",
        "lat":37.33461946,
        "lng":-122.03478727,
        "speed":21.78,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:07.729Z",
        "lat":37.33460316,
        "lng":-122.0350347,
        "speed":22.45,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:08.725Z",
        "lat":37.33458564,
        "lng":-122.03529395,
        "speed":23.24,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:09.731Z",
        "lat":37.3345628,
        "lng":-122.03556217,
        "speed":23.81,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:10.717Z",
        "lat":37.3345597,
        "lng":-122.03583308,
        "speed":24.28,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:11.720Z",
        "lat":37.33454847,
        "lng":-122.03611286,
        "speed":24.59,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:12.719Z",
        "lat":37.33454218,
        "lng":-122.03638578,
        "speed":25.1,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:13.713Z",
        "lat":37.33454235,
        "lng":-122.03666775,
        "speed":25.15,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:14.731Z",
        "lat":37.33453849,
        "lng":-122.03695223,
        "speed":25.44,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:15.724Z",
        "lat":37.33453874,
        "lng":-122.03724626,
        "speed":25.74,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:16.714Z",
        "lat":37.33453652,
        "lng":-122.03753997,
        "speed":26.12,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:17.725Z",
        "lat":37.33452613,
        "lng":-122.03783266,
        "speed":26.61,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:18.737Z",
        "lat":37.33451917,
        "lng":-122.03813827,
        "speed":27.07,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:19.712Z",
        "lat":37.33451284,
        "lng":-122.03845141,
        "speed":27.47,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:20.726Z",
        "lat":37.33450379,
        "lng":-122.03875937,
        "speed":27.98,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:21.734Z",
        "lat":37.33449629,
        "lng":-122.03908048,
        "speed":28.74,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:22.718Z",
        "lat":37.33448791,
        "lng":-122.03941089,
        "speed":29.24,
        "distLeft":30000,
        "altitude":0
      },

      {
        "timestamp":"2018-04-11T04:33:58.109Z",
        "lat":37.33527476,
        "lng":-122.03254703,
        "speed":1.67,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:33:59.122Z",
        "lat":37.33525552,
        "lng":-122.03254838,
        "speed":2.03,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:00.108Z",
        "lat":37.33523566,
        "lng":-122.03254863,
        "speed":2.23,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:01.108Z",
        "lat":37.33521504,
        "lng":-122.03254905,
        "speed":2.14,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:02.112Z",
        "lat":37.33519572,
        "lng":-122.0325498,
        "speed":1.94,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:03.111Z",
        "lat":37.33517518,
        "lng":-122.03255055,
        "speed":2.41,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:04.104Z",
        "lat":37.33515083,
        "lng":-122.03255349,
        "speed":2.89,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:05.107Z",
        "lat":37.3351212,
        "lng":-122.03256229,
        "speed":3.64,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:06.138Z",
        "lat":37.33507162,
        "lng":-122.0326037,
        "speed":4.47,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:07.101Z",
        "lat":37.33503868,
        "lng":-122.03265072,
        "speed":6.37,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:08.108Z",
        "lat":37.33500926,
        "lng":-122.03272188,
        "speed":7.74,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:09.119Z",
        "lat":37.33497737,
        "lng":-122.03281282,
        "speed":9.18,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:10.120Z",
        "lat":37.33494812,
        "lng":-122.0329212,
        "speed":10.78,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:11.111Z",
        "lat":37.33492222,
        "lng":-122.03304215,
        "speed":12.11,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:12.120Z",
        "lat":37.33489242,
        "lng":-122.03318372,
        "speed":13.66,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:13.126Z",
        "lat":37.33485843,
        "lng":-122.03334424,
        "speed":14.82,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:14.108Z",
        "lat":37.33482105,
        "lng":-122.03350886,
        "speed":15.9,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:15.113Z",
        "lat":37.33477977,
        "lng":-122.03369603,
        "speed":17.21,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:16.108Z",
        "lat":37.33474691,
        "lng":-122.03389325,
        "speed":18.27,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:17.126Z",
        "lat":37.33470894,
        "lng":-122.03411085,
        "speed":19.27,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:18.115Z",
        "lat":37.33467638,
        "lng":-122.03432425,
        "speed":20.07,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:19.105Z",
        "lat":37.33464561,
        "lng":-122.03455442,
        "speed":20.91,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:20.115Z",
        "lat":37.33461946,
        "lng":-122.03478727,
        "speed":21.78,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:21.127Z",
        "lat":37.33460316,
        "lng":-122.0350347,
        "speed":22.45,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:22.128Z",
        "lat":37.33458564,
        "lng":-122.03529395,
        "speed":23.24,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:23.116Z",
        "lat":37.3345628,
        "lng":-122.03556217,
        "speed":23.81,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:24.100Z",
        "lat":37.3345597,
        "lng":-122.03583308,
        "speed":24.28,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:25.116Z",
        "lat":37.33454847,
        "lng":-122.03611286,
        "speed":24.59,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:26.110Z",
        "lat":37.33454218,
        "lng":-122.03638578,
        "speed":25.1,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:27.104Z",
        "lat":37.33454235,
        "lng":-122.03666775,
        "speed":25.15,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:28.111Z",
        "lat":37.33453849,
        "lng":-122.03695223,
        "speed":25.44,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:29.152Z",
        "lat":37.33453874,
        "lng":-122.03724626,
        "speed":25.74,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:30.097Z",
        "lat":37.33453652,
        "lng":-122.03753997,
        "speed":26.12,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:31.125Z",
        "lat":37.33452613,
        "lng":-122.03783266,
        "speed":26.61,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:32.152Z",
        "lat":37.33451917,
        "lng":-122.03813827,
        "speed":27.07,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:33.100Z",
        "lat":37.33451284,
        "lng":-122.03845141,
        "speed":27.47,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:34.120Z",
        "lat":37.33450379,
        "lng":-122.03875937,
        "speed":27.98,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:35.122Z",
        "lat":37.33449629,
        "lng":-122.03908048,
        "speed":28.74,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:36.119Z",
        "lat":37.33448791,
        "lng":-122.03941089,
        "speed":29.24,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:37.122Z",
        "lat":37.33447622,
        "lng":-122.0397398,
        "speed":29.81,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:38.130Z",
        "lat":37.33447068,
        "lng":-122.04007348,
        "speed":30.45,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:39.124Z",
        "lat":37.33446519,
        "lng":-122.04041597,
        "speed":31.11,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:40.109Z",
        "lat":37.3344584,
        "lng":-122.04077831,
        "speed":31.67,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:41.109Z",
        "lat":37.33445283,
        "lng":-122.04113765,
        "speed":32.3,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:42.110Z",
        "lat":37.3344499,
        "lng":-122.04149924,
        "speed":32.3,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:43.106Z",
        "lat":37.33444604,
        "lng":-122.04187567,
        "speed":33.18,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:44.104Z",
        "lat":37.33444843,
        "lng":-122.04226334,
        "speed":33.61,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:45.117Z",
        "lat":37.33444952,
        "lng":-122.04265083,
        "speed":33.87,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:46.136Z",
        "lat":37.33445363,
        "lng":-122.04302852,
        "speed":34.3,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:47.112Z",
        "lat":37.33445945,
        "lng":-122.04342255,
        "speed":34.51,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:48.116Z",
        "lat":37.33446146,
        "lng":-122.04380955,
        "speed":34.77,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:49.106Z",
        "lat":37.33445832,
        "lng":-122.04420408,
        "speed":34.56,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:50.119Z",
        "lat":37.33445442,
        "lng":-122.04458579,
        "speed":34.06,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:51.145Z",
        "lat":37.33444763,
        "lng":-122.04496063,
        "speed":33.54,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:52.399Z",
        "lat":37.33444244,
        "lng":-122.045341,
        "speed":33.15,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:53.121Z",
        "lat":37.33443657,
        "lng":-122.04571727,
        "speed":33.01,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:54.116Z",
        "lat":37.33441708,
        "lng":-122.04607568,
        "speed":32.66,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:55.127Z",
        "lat":37.3343947,
        "lng":-122.04644121,
        "speed":32.51,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:56.131Z",
        "lat":37.33436235,
        "lng":-122.04681002,
        "speed":31.95,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:57.118Z",
        "lat":37.33431797,
        "lng":-122.04716524,
        "speed":31.28,
        "distLeft":30000,
        "altitude":0
      },
      {
        "timestamp":"2018-04-11T04:34:58.104Z",
        "lat":37.33426985,
        "lng":-122.04751058,
        "speed":30.94,
        "distLeft":30000,
        "altitude":0
      }];


    for(var gpsdata of locationData){
          latlngs.push([gpsdata.lat, gpsdata.lng]);

    }
    var myIcon = L.icon({
      iconUrl: '../../assets/Image/marker-icon.png',
      iconSize: [30, 55],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });





    // L.marker(new L.LatLng(latlngs[0]), {
    //   icon: L.mapbox.marker.icon({'marker-symbol': 'post', 'marker-color': '0044FF'}),
    //   title: 'Start Point'
    // }).addTo(map);
    //
    //  L.marker(new L.LatLng(latlngs[latlngs.length-1]), {
    //   icon: L.mapbox.marker.icon({'marker-symbol': 'post', 'marker-color': '0044FF'}),
    //   title: 'Start Point'
    // }).addTo(map);

    L.marker(latlngs[0],{icon: myIcon}).addTo(map);
    L.marker(latlngs[latlngs.length-1],{icon: myIcon}).addTo(map);
    var polyline = L.polyline(latlngs, {color: '#ffa500',weight: 7,lineCap: 'round', stroke:true}).addTo(map);
// zoom the map to the polyline
    map.fitBounds(polyline.getBounds());




    // Change the code here..


  }

}
