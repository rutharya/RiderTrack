import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../shared/services/events.service';
import * as toastr from 'toastr';
import {UserService} from "../../shared/services";
import {Api_Response} from "../../shared/models/api_response.model";
import {Errors} from "../../shared/models";
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
  isSubmitting = false;
  errors: Errors = {errors: {}};
  currentUser = null;

  //formatDate = moment(this.currentDate).format('YYYYMMDD');

  constructor(private eventsService: EventsService,private userservice: UserService) {

  }

  ngOnInit() {
    toastr.options.timeOut = 3000;
    this.eventsService.getRegisteredEvents()
      .subscribe(res => {
        this.regEvents = res;
        this.formatEvents(this.regEvents);
      });

    this.currentUser = this.userservice.getCurrentUser();

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
          if (this.regResp.result.toString() === 'true') {
            toastr.success("Succesfully Unregistered from the Event");
          } else if (this.regResp.result.toString() === 'false') {
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

    var email = prompt("Enter an email id to Invite spectator:");

    if (email == null || email == "") {
      console.log("User cancelled invite");
    } else {
      console.log(email, id);

      this.isSubmitting = true;
      this.errors = {errors: {}};
      this.eventsService.send_invite(email,id).subscribe( data => {
        console.log(data);
        toastr.warning('Spectator invited! Good luck.');
        //TODO: redirect the user to login component?
      }, err => {
        toastr.error(`ERROR: ${err}`);
      });
    }

  }



}
