import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ActivityService{
  constructor(private  apiService: ApiService,
              private http: HttpClient){}

  public getStats(): any{
    return statistics;
  }

}

//TODO: play around with this mock data and change it to [] array of stats and use *ngFor in Html.

var statistics = {
  mostparticipatedactivity: "Marathon",
  participationcount: 3,
  avgspeed: 12,
  maxspeed:13,
  totaldistance:323,
  longestdistance: 76,
  elevationgain: 23,
  maxelevationgain: 12,
  wincount:1,
  movingtime:439,
  longestmovingtime:180
};
