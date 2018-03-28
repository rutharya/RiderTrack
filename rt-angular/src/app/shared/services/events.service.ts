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
  // saveEvent() {
  //   return this._http.post('http://localhost:3000/saveEvent', {})
  // }
}
