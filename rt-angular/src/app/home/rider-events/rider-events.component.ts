import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../shared/services/events.service';
import {Router, NavigationExtras} from "@angular/router";

@Component({
  selector: 'app-rider-events',
  templateUrl: './rider-events.component.html',
  styleUrls: ['./rider-events.component.css']
})
export class RiderEventsComponent implements OnInit {
  events = null;
  getAllFutEvents = null;

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
      const setDate = monthNames[eventDate.getMonth()] + ' ' + eventDate.getDate() + ' ' + eventDate.getFullYear();
      eventsList[i].date = setDate;
    }
  }

  getEventInfo(eventObj: any){
    console.log(eventObj);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "eventName": eventObj.name
      }
    };
    this.router.navigate(['detail']);
  }


// addRider (id){
//
//   const req = this.http.post('/events/addRiderToEvent', {
//     body: {
//       "eventid" : id,
//     }
//   })
//     .subscribe(
//       res => {
//         console.log("SUCCESS RESPONSE")
//         console.log(res);
//       },
//       err => {
//         console.log("Error occured");
//       }
//     );
//   }


}
