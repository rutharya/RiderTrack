import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../shared/services/events.service';


@Component({
  selector: 'app-rider-events',
  templateUrl: './rider-events.component.html',
  styleUrls: ['./rider-events.component.css']
})
export class RiderEventsComponent implements OnInit {
  events = null;
  getAllFutEvents = null;
  regResp = null

  constructor(private eventsService: EventsService) {
  }

  ngOnInit() {
    this.eventsService.getEvents()
      .subscribe(res => {
        this.events = res;
        this.getAllFutEvents = res;
        this.getFutureEvents(this.getAllFutEvents);
      });
  }

  getFutureEvents(AllEvents) {
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

  formatDate(eventsList) {
    // success code
    console.log('Formatting dates, list length: ' + eventsList.length);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    eventsList.sort(function (a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    for (let i = 0; i < eventsList.length; i++) {
      const eventDate = new Date(eventsList[i].date);
      eventDate.setHours(0, 0, 0, 0);
      const setDate = monthNames[eventDate.getMonth()] + ' ' + eventDate.getDate() + ' ' + eventDate.getFullYear();
      eventsList[i].date = setDate;
    }
  }


addRider (id){
    console.log(id)

  this.eventsService.register(id)
    .subscribe(res => {
      this.regResp = res;
    });
  console.log(this.regResp)
  }


}
