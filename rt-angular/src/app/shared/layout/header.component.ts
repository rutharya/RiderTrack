import { Component, OnInit } from '@angular/core';
import {EventsService, UserService} from '../services';
import { Event, User } from '../models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'RiderTrack';
  searchTerm = '';
  Events: Event[];
  foundEvents: Event[];
  isIn = false;   // store state
  currentUser: User;

  constructor(
    private userService: UserService,
    private eventsService: EventsService,
    private router: Router
  ) {}



  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
    this.eventsService.getEvents().subscribe(
      (eventsData) => {
        this.Events = eventsData;
      }
    );
  }

  logout() {
      this.userService.purgeAuth();
      this.router.navigateByUrl('/');
  }

  search(searchTerm) {
    console.log(searchTerm);
    const term = searchTerm.toLocaleLowerCase();
    // var results: Event[] = [];
    this.foundEvents = this.Events.filter(event => event.name.toLocaleLowerCase().indexOf(term) > -1);
    // console.log(matchingEvents);
  }
  toggleState() { // click handler
    const bool = this.isIn;
    this.isIn = bool === false ? true : false;
  }
}
