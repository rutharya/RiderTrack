import { Component, OnInit } from '@angular/core';
import {EventsService} from "../shared/services/events.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})


export class EventsComponent implements OnInit {
  asdf = '';

  constructor(private eventsService: EventsService){

  }

  ngOnInit() {
    this.eventsService.getEvents()
      .subscribe(res => {
        console.log(res);
        this.asdf = res.toString();
      });
  }

}
