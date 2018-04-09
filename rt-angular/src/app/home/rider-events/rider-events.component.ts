import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../shared/services/events.service';
import {Router, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-rider-events',
  templateUrl: './rider-events.component.html',
  styleUrls: ['./rider-events.component.css']
})
export class RiderEventsComponent implements OnInit {
  events = null;
  getAllFutEvents = null;
  regResp = null;

  constructor(private eventsService: EventsService, private router: Router) {
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
      const setDate = monthNames[eventDate.getMonth()] + ' ' + (eventDate.getDate() + 1) + ' ' + eventDate.getFullYear();
      eventsList[i].date = setDate;
    }
  }

  getEventInfo(eventObj: any) {
    console.log(eventObj);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'eventName': eventObj.name
      }
    };
    this.router.navigate(['detail']);
  }


addRider (id) {
    console.log('rider id ');
    console.log(id);

  this.eventsService.register(id)
    .subscribe(res => {
      this.regResp = res;
      console.log(this.regResp)

      if(this.regResp.Result.toString()==='OK') {
        confirm("You have succesfully registered to this Event")
      }else if(this.regResp.Result.toString()==='false') {
        confirm("You are already registered to this Event");
      }
    });
<<<<<<< HEAD
  console.log(this.regResp);
=======

>>>>>>> 7a38bf0a4833be94c0dae813899bcddab135b94f
  }


}
