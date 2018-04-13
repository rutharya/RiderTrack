import {LatLng} from "./latlng.model";

export interface RiderDataDmass {
  latestcoordinates: LatLng;
  gps_stats: GPS_Stats[];
  completed: boolean;
  _id: string;
  eventid: string;
  riderid: string;
}

export interface GPS_Stats {
  lat: number,
  lng: number,
  speed?:number,
  distanceleft?:number,
  altitude?:number
}
