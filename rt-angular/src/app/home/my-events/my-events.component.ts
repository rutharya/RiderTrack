import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../shared/services/events.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  regEvents = null;
  formattedEvents = null;
  currentDate = new Date().toISOString();
  //formatDate = moment(this.currentDate).format('YYYYMMDD');

  constructor(private eventsService: EventsService) {

  }

  ngOnInit() {
    this.eventsService.getRegisteredEvents()
      .subscribe(res => {
        this.regEvents = res;
        this.formatEvents(this.regEvents.registeredEvents);
      });
  }

  formatEvents(eventsList) {
    console.log("Current date is " + this.currentDate)
    console.log('Formatting dates, list length: ' + eventsList.length);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    eventsList.sort(function (a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });


    for (let i = 0; i < eventsList.length; i++) {
      const eventDate = new Date(eventsList[i].date);
      const setDate = eventDate.toISOString();
      eventsList[i].date = setDate;
    }
}




}
