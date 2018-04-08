import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class EventsService {

  constructor(private apiService: ApiService) { }

  getEvents() {
    return this.apiService.get('/events')
      .map(result => result);
  }

  saveEvent (data): any {
    console.log(data);
    console.log('Events service');
    const body = {
      name: data.name,
      description: data.description,
      location: data.location,
      eventDate: data.eventDate,
      startTime: data.startTime,
      endTime: data.endTime
    }
    console.log(body);
    const res = this.apiService.post('/events/save', body).map(result => result);
    return res;
  }

  register (data): any {
    console.log(data);
    // const body = {
    //   eventId: data
    // };
    let body = new URLSearchParams();
    body.set("eventId", data)
    console.log(body);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const URL = '/events/register';
    return this.apiService.post('/events/register', body.toString()
    , options);
  }

  getRegisteredEvents() {
    return this.apiService.get('/events/registered_events')
      .map(result => result);

  }


}

