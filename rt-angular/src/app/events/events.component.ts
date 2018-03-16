import { Component, OnInit } from '@angular/core';
import {EventsService} from "../shared/services/events.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})


export class EventsComponent implements OnInit {
  asdf = '';
  



events = [
    {
        "name" : "Seattle Marathon",
        "image" : "http://www.parcjeandrapeau.com/medias/images/header/marathon-et-demi-marathon-oasis-rock-n-roll-de-montreal.jpg",
        "description" : "ASU Trekking at Arizona State University at A Mountain Tempe ASU",
        "date" : "02-10-2017",
        "location" : "Washington Street",
        "time" : "03:00 pm - 06:00 pm"
    },
    {
        "name" : "ASU Tempe Trekking",
        "image" : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg",
        "description" : "ASU Trekking at Arizona State University at A Mountain Tempe ASU",
        "date" : "02-10-2017",
        "location" : "A-Mountain",
        "time" : "03:00 pm - 06:00 pm"
    },
    {
        "name" : "Event TWO",
        "image" : "https://fwmdocks.com/wp-content/uploads/2017/01/FWM-Rowing-807x356-1.jpg",
        "description" : "ASU Trekking at Arizona State University at A Mountain Tempe ASU",
        "date" : "02-10-2017",
        "location" : "A-Mountain",
        "time" : "03:00 pm - 06:00 pm"
    },
    {
        "name" : "Event THREE",
        "image" : "http://www.parcjeandrapeau.com/medias/images/header/marathon-et-demi-marathon-oasis-rock-n-roll-de-montreal.jpg",
        "description" : "ASU Trekking at Arizona State University at A Mountain Tempe ASU",
        "date" : "02-10-2017",
        "location" : "A-Mountain",
        "time" : "03:00 pm - 06:00 pm"
    }

    ]



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
