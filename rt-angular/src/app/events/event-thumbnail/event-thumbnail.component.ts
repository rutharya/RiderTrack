import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Event} from '../../shared/';
import {User} from '../../shared';

@Component({
  selector: 'app-event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styleUrls: ['./event-thumbnail.component.css']
})
export class EventThumbnailComponent implements OnInit {
  @Input() event: Event;
  @Input() user:  User;
  //ruthar: output paramter if we need to send any data back out.
  @Output() eventClick = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }


  handleClick(eventId){
    console.log('handle CLick');
    console.log(eventId)
  }
  handleEventClick() {
    //i have access to the event object injected from the
    console.log('click me clicked');
    this.eventClick.emit(this.event.name);
  }

}
