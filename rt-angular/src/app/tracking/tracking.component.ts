import { Component, OnInit } from '@angular/core';
import {LatestLocationService} from './latest-location.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  constructor(private latestLocationService: LatestLocationService) { }

  ngOnInit() {
    this.latestLocationService.getLatestLocation().subscribe(
      data => {console.log('AAAA' + data );
      });
  }

}
