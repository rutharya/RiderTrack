import { Component, OnInit } from '@angular/core';
import {EventsService} from '../shared/services/events.service';
import {Router} from "@angular/router";
import { Event } from '../shared/models'
import {User} from "../shared/models";


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})


export class EventsComponent implements OnInit {
   events: Event[];
   user: User;
   getAllFutEvents = null;
   getAllPastEvents = null;


  constructor(private eventsService: EventsService, private router: Router) {

  }

  ngOnInit() {
    this.eventsService.getEvents()
      .subscribe(res => {
        this.events = res;
        this.getAllPastEvents = res;
        this.getAllFutEvents = res;
        this.getFutureEvents(this.getAllFutEvents);
       // this.events = res[0].name;
      });
    // this.eventsService.getEvents().subscribe(res => {
    //   this.events = res;
    // })
  }

  handleThumbnailClick(name){
    console.log('handle thumbnail click');
    console.log(name);
  }

  getUpcomingEvents() {
    this.getFutureEvents(this.getAllFutEvents);
  }


  getFutureEvents(AllEvents){
    const upcomingEvents = [];
    let k = 0;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    for (let i = 0; i < AllEvents.length; i++) {
      const eventDate = new Date(AllEvents[i].date);
      eventDate.setHours(0, 0, 0, 0);
      if (eventDate.getTime() >= currentDate.getTime()) {
        upcomingEvents[k++] = AllEvents[i];
      }
    }
    this.formatDate(upcomingEvents);
    upcomingEvents.reverse();
    this.events = upcomingEvents;
  }

  getPastEvents() {
    console.log('Loading past events' + this.events);
    const pastEvents = [];
    let k = 0;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    for (let i = 0; i < this.getAllPastEvents.length; i++) {
       const eventDate = new Date(this.getAllPastEvents[i].date);
      eventDate.setHours(0, 0, 0, 0);
      if (eventDate.getTime() < currentDate.getTime()) {
        pastEvents[k++] = this.getAllPastEvents[i];
      }
    }
    this.formatDate(pastEvents);
    this.events = pastEvents;
  }

  formatDate(eventsList) {
    // success code
    console.log('Formatting dates, list length: ' + eventsList.length);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    eventsList.sort(function(a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    for (let i = 0; i < eventsList.length; i++) {
      const eventDate = new Date(eventsList[i].date);

      eventDate.setHours(0, 0, 0, 0);
      const setDate = monthNames[eventDate.getMonth()] + ' ' + (eventDate.getDate()) + ' ' + eventDate.getFullYear();
      eventsList[i].date = setDate;

    }
  }

  viewRider(){
    console.log("Button clicked....");
    this.router.navigateByUrl('./events/eventTracking').then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there'pps an error
    });
  }

}
