import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ActivityService{
  constructor(private  apiService: ApiService,
              private http: HttpClient){}

  public getStats(): any{
    return this.apiService.get('/userstatistics')
      .map(result => result);
  }
}

//TODO: play around with this mock data and change it to [] array of stats and use *ngFor in Html.

