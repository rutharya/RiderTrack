import { Component, OnInit } from '@angular/core';
import { MapService} from '../shared/services/maps.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  constructor(private _mapService: MapService) { }

  ngOnInit() {
    this._mapService.plotActivity();
  }

}
