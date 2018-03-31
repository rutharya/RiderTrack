import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {UserProfile} from "../models";
import { Observable } from 'rxjs/Observable';

import { map } from 'rxjs/operators/map';



@Injectable()
export class ProfilesService {
  constructor(private  apiService: ApiService) {
  }
  get(username: string): Observable<UserProfile> {
    return this.apiService.get('/profiles/' + username)
      .pipe(map((data: {profile: UserProfile}) => data.profile));
  }

  follow(username: string): Observable<UserProfile> {
    return this.apiService.post('/profiles/' + username + '/follow');
  }

  unfollow(username: string): Observable<UserProfile> {
    return this.apiService.delete('/profiles/' + username + '/follow');
  }
}
