import { Component, OnInit } from '@angular/core';
import {ActivityService} from "../../../shared/services/activity.service";

@Component({
  selector: 'app-mystats-summary',
  templateUrl: './mystats-summary.component.html',
  styleUrls: ['./mystats-summary.component.css']
})
export class MystatsSummaryComponent implements OnInit {
  stats: any;
  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    this.stats = this.activityService.getStats();
  }

}
