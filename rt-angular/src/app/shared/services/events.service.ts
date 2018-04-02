import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EventsService {

  constructor(private apiService: ApiService) { }

  getEvents() {
    return this.apiService.get('/events')
      .map(result => result);
  }

  saveEvent (formGroup) {
    const URL = './events';
    const res = this.apiService.post(URL, formGroup).map(result => result);
    return res;
  }

  register (data):any {
    console.log(data);
    var body = {
      eventId: data
    };
    console.log(body);
    const URL = '/events/register';
    return this.apiService.post('/events/register', body);
  }

  getRegisteredEvents(){
    return this.apiService.get('/events/registered_events')
      .map(result => result);

  }


  // saveEvent() {
  //   return this._http.post('http://localhost:3000/saveEvent', {})
  // }
}
