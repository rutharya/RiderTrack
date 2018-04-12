import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {ApiService} from './api.service';


@Injectable()
export class StatisticsService {

  constructor(private _http: HttpClient, private apiService: ApiService) { }

  public getStats() {
    return this.apiService.get('/userstatistics')
      .map(result => result);
  }

  public  getDatapoints() {
    return this.apiService.get('/userdatapoints')
      .map(result => result);
  }

  public getLatestEvent() {
    return this.apiService.get('/getLatestEvent')
      .map(result => result);
  }

  public getEventStats() {
    return this.apiService.get('/activities/getEventStats')
      .map(result => result);
  }

  public getEventDatapoints() {
    return this.apiService.get('/activities/eventplotpoints')
      .map(result => result);
  }
}
