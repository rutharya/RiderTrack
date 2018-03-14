import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
//TODO: add jquery to angular -> can easily do data-toggle, and team is comfortable using jquery with bootstrap.
//TODO: jquery has been installed, -> use it responsibly and in proper click listners.
import * as $ from 'jquery';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  wasClicked = false;


  constructor() { }
  @Input() selected: string;
  @Output() notify: EventEmitter<boolean> =  new EventEmitter<boolean>();
  ngOnInit() {

  }
  //tried to toggle sidebar to show other values.
  onToggleSubmenu(toggled: boolean) {
    console.log(toggled);
    console.log(this.wasClicked);
    if(this.wasClicked){
      this.wasClicked = false;

    }else {
      this.wasClicked = true;
    }
  }
  //this is for the onclick -> for the first menu item

  toEvents(event){
    console.log(event);
    console.log('events clicked from sidebar');
    console.log(this.notify);
    this.notify.emit(true);
    return;
  }

  toDashboard(){
    console.log('dashboard clicked from sidebar');
    this.notify.emit(true);
    return;
  }


}
