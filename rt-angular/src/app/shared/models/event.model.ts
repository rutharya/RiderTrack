import {LatLng} from "./latlng.model";

export interface Event {
  _id: string;
  name: string;
  image?: string;
  description: string;
  date: Date;
  location: string;
  startTime: Date;
  endTime: Date;
  trackFile: string;
  track?: {
    elevation: number;
    length: number;
    difficulty: string;
  };
  eventRiders: string[];
  raceWinners: string[];
  statusOfRace: string;
  startLocation: LatLng;
  endLocation: LatLng;
}


