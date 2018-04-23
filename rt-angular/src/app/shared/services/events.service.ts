import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import {FileUpload} from '../models/fileupload';
import {map} from "rxjs/operators";
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

  send_invite(email, eventid): any {
    const route = '/sendinvite';
    console.log('inside sendinvite');
    // make post request with email to /users/sendinvite
    const credentials = new URLSearchParams();
    credentials.set('email', email);
    credentials.set('eventid', eventid);
    console.log(credentials);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.apiService.post2('/events' + route, credentials.toString(), options)
      .pipe(map(data => {
        if (data.result) {
          return data.status;
        } else {
          console.log('failure');
          return data.status.msg;
        }
      }));
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

