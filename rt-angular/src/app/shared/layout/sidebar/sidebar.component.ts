import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {

  }
  onclick(){

  }
  //tried to toggle sidebar to show other values.
  onToggleSubmenu(toggled: boolean) {
    console.log(toggled);
    console.log(this.wasClicked);
    if(this.wasClicked){
      this.wasClicked = false;

    }else{
      this.wasClicked=true;
    }
  }
  //this is for the onclick -> for the first menu item
  onClick() {
    this.wasClicked= !this.wasClicked;
    console.log(this.wasClicked);
  }



}
