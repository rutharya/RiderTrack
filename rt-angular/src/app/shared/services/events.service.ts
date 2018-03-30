import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';

@Injectable()
export class EventsService {

  constructor(private _http: HttpClient) { }

  getEvents() {
    return this._http.get('events/getAllEvents')
      .map(result => result);
  }

  saveEvent (formGroup) {
    const URL = 'events/save';
    const res = this._http.post(URL, formGroup).map(result => result);
    return res;
  }

  register (formGroup) {
    const body = {"eventid" : formGroup};
    const URL = 'events/addRiderToEvent';
    const res = this._http.post(URL, body).map(result => result);
    return res;
  }

  getRegisteredEvents(){
    return this._http.get('events/getRegisteredEvents')
      .map(result => result);

  }


  // saveEvent() {
  //   return this._http.post('http://localhost:3000/saveEvent', {})
  // }
}
