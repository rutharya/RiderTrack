import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import {FileUpload} from '../models/fileupload';
@Injectable()
export class EventsService {
  fileUpload: FileUpload;

  constructor(private apiService: ApiService) { }

  getEvents() {
    return this.apiService.get('/events')
      .map(result => result);
  }

  saveEvent (data): any {
    console.log(data);
    console.log('Events service');
    // const body = {
    //   name: data.name,
    //   description: data.description,
    //   location: data.location,
    //   date: data.date,
    //   startTime: data.startTime,
    //   endTime: data.endTime
    // };
    const body = new URLSearchParams();
    body.set('name', data.name);
    body.set('description', data.description);
    body.set('location', data.location);
    body.set('date', data.date);
    body.set('startTime', this.convertTimeToDate(data.date, data.startTime));
    body.set('endTime', this.convertTimeToDate(data.date, data.endTime));
    body.set('trackFile', data.trackFile);
    body.set('image', data.image);
    body.set('startLat', data.startLat);
    body.set('startLng', data.startLng);
    body.set('endLat', data.endLat);
    body.set('endLng', data.endLng);
    body.set('elevation', data.elevation);
    body.set('length', data.length);
    body.set('difficulty', data.difficulty);
    console.log(body);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const res = this.apiService.post2('/events/save', body.toString(), options);
    return res;
  }
  convertTimeToDate(date, time): any {
    const timeString = date + 'T' + time + ':00Z';
    return timeString;
  }
  register (data): any {
    console.log(data);
    // const body = {
    //   eventId: data
    // };
    const body = new URLSearchParams();
    body.set('eventId', data);
    console.log(body);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const URL = '/events/register';
    return this.apiService.post2('/events/register', body.toString()
    , options);
  }

  unregister (data): any {
    console.log(data);
    const body = new URLSearchParams();
    body.set('eventId', data);
    console.log(body);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const URL = '/events/register';
    return this.apiService.post2('/events/unregister', body.toString()
      , options);
  }



  getRegisteredEvents() {
    return this.apiService.get('/events/registered_events')
      .map(result => result);

  }

  getEventsById(eventId):any{
    return this.apiService.get('/events/'+eventId.toString())
      .map(result => result);
  }


}

