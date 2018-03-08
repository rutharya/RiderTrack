import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import "rxjs/add/operator/map";
import {StatisticsService} from "../shared/services";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chart = [];
  constructor(private statisticsService: StatisticsService) {
    console.log('constructor called');
  }

  ngOnInit(){
  console.log('ng ininit');
    this.statisticsService.getStats()
      .subscribe(res => {
        console.log(res);
      //TODO: data received from statistics service -> modify for chart udpate.
        //TODO: remove static data thats encoded for now.
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    });//end of subscribe
  }
}
