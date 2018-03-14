import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Injectable} from "@angular/core";

@Injectable()
export class StatisticsService {

  constructor(private _http: HttpClient) { }

  getStats() {
    return this._http.get("http://localhost:3000/statistics")
      .map(result => result);
  }

}
