import { Component, OnInit } from '@angular/core';
import {ActivityService} from "../../../shared/services/activity.service";
import {StatisticsService} from "../../../shared/services/statistics.service";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-mystats-summary',
  templateUrl: './mystats-summary.component.html',
  styleUrls: ['./mystats-summary.component.css']
})
export class MystatsSummaryComponent implements OnInit {
  result: any;
  public participationcount = "";
  public  totaldistance = "";
  public longestdistance = "";
  public avgspeed = "";
  public maxspeed = "";
  public totalmovingtime = "";
  public  longestmovingtime = "";
  public maxelevation = "";
  speedchart = [];
  distchart = [];
  altchart = [];
  speeddata : any;
  distancedata: any;
  altitudedata: any;
  constructor(private activityService: ActivityService, private statservice: StatisticsService) { }

  ngOnInit() {

    console.log('ngonit mystats');
    this.result = this.statservice.getStats();
    this.statservice.getStats()
      .subscribe(res => {
        if(res == "Unauthorized") {
        }
        else{
          this.result = [];
          this.participationcount = res['statistics']['participationcount'];
          this.totaldistance = res['statistics'].totaldistance;
          this.longestdistance = res['statistics'].longestdistance;
          this.avgspeed = res['statistics'].avgspeed;
          this.maxspeed = res['statistics'].maxspeed;
          this.totalmovingtime = res['statistics'].totalmovingtime;
          this.longestmovingtime = res['statistics'].longestmovingtime;
          this.maxelevation = res['statistics'].maxelevation;
        }
        console.log(res['statistics']);
        //TODO: data received from statistics service -> modify for chart udpate.
        //TODO: remove static data thats encoded for now.
        this.result = res['statistics'];
      });//end of subscribe

    this.statservice.getDatapoints()
      .subscribe(res => {
        console.log(res[0]);
        if(res === undefined || res === []){

        }
        else {
          this.speeddata = res[0]['speed'];
          this.distancedata = res[0]['distance'];
          this.altitudedata = res[0]['altitude'];
        }
        var len = this.distancedata.length
        var labels = Array.apply(null, {length: len}).map(Number.call, Number)
        //TODO: data received from statistics service -> modify for chart udpate.
        //TODO: remove static data thats encoded for now.
        this.speedchart = new Chart('speedchart', {
          type: 'line',
          data: {

            labels: labels,
            datasets: [{
              fill:false,
              label: 'Average speed across events',
              data: this.speeddata,
              borderColor: [
                "#3cba9f",
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: false
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Speed in MPH'
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Event Number'
                }
              }]
            }
          }
        });
        this.distchart = new Chart('distchart', {
          type: 'line',
          data: {

            labels: labels,
            datasets: [{
              fill:false,
              label: 'Distance covered across events',
              data: this.distancedata,
              borderColor: [
                "#3e95cd"
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: false
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Distance in miles'
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Event Number'
                }
              }]
            }
          }
        });
        // this.altchart = new Chart('altchart', {
        //   type: 'line',
        //   data: {
        //     labels: labels,
        //     datasets: [{
        //       label: 'Altitude across events',
        //       data: this.altitudedata,
        //       backgroundColor: [
        //         'rgba(255, 99, 132, 0.2)',
        //         'rgba(54, 162, 235, 0.2)',
        //         'rgba(255, 206, 86, 0.2)',
        //         'rgba(75, 192, 192, 0.2)',
        //         'rgba(153, 102, 255, 0.2)',
        //         'rgba(255, 159, 64, 0.2)'
        //       ],
        //       borderColor: [
        //         'rgba(255,99,132,1)',
        //         'rgba(54, 162, 235, 1)',
        //         'rgba(255, 206, 86, 1)',
        //         'rgba(75, 192, 192, 1)',
        //         'rgba(153, 102, 255, 1)',
        //         'rgba(255, 159, 64, 1)'
        //       ],
        //       borderWidth: 1
        //     }]
        //   },
        //   options: {
        //     scales: {
        //       yAxes: [{
        //         ticks: {
        //           beginAtZero: false
        //         },
        //         scaleLabel: {
        //           display: true,
        //           labelString: 'Altitude in Feet'
        //         }
        //       }],
        //       xAxes: [{
        //         scaleLabel: {
        //           display: true,
        //           labelString: 'Event Number'
        //         }
        //       }]
        //     }
        //   }
        // });
      });//end of subscribe


  }

}
