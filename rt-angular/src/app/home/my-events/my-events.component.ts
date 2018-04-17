import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../shared/services/events.service';
import * as toastr from 'toastr';
//import * as bootbox from 'bootbox';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  regEvents = null;
  regResp = null;
  formattedEvents = null;
  currentDate = new Date().toISOString();

  //formatDate = moment(this.currentDate).format('YYYYMMDD');

  constructor(private eventsService: EventsService) {

  }

  ngOnInit() {
    toastr.options.timeOut = 3000;
    this.eventsService.getRegisteredEvents()
      .subscribe(res => {
        this.regEvents = res;
        this.formatEvents(this.regEvents);
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

  removeRider(id) {
    console.log('rider id ');
    console.log(id);
   if(window.confirm("Confirm Event Unregistration")) {
      this.eventsService.unregister(id)
        .subscribe(res => {
          this.regResp = res;
          console.log(this.regResp)
          if (this.regResp.Result.toString() === 'true') {
            toastr.success("Succesfully Unregistered from the Event");
          } else if (this.regResp.Result.toString() === 'false') {
            toastr.error("You have already unregistered from the event");
          }
         // window.location.reload();
          history.go(0);
        });
      console.log(this.regResp);

    }

  }

  inviteSpec(id){
  //bootbox.alert("In alert");
   var emailid = prompt("Enter an email id to Invite spectator:");
    if (emailid == null || emailid == "") {
      console.log("User cancelled to invite");
    } else {
      console.log("Email Id is: " +emailid+ " Event Id is: "+ id);
    }

  }



}
