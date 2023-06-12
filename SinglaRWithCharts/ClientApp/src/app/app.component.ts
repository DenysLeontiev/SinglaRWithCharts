import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { SignalRService } from './_services/signal-r.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        min: 0
      }
    }
  };
  chartLabels: string[] = ['Real time data for the chart'];
  chartType: ChartType = 'bar';
  chartLegend: boolean = true;
  public colors: any[] = [{ backgroundColor: "#5491DA" },
                          { backgroundColor: "#5491DA" },
                          { backgroundColor: "#5491DA" }, 
                          { backgroundColor: "#5491DA" }];

  title = 'SignalR with Charts';

  constructor(public signalRService: SignalRService, private http: HttpClient) { }


  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataList();
    this.startHttpRequest();
    this.signalRService.addBroadcastChartDataListener();
  }

  private startHttpRequest = () => {
    this.http.get("https://localhost:7122/api/chart").subscribe((response) => {
      console.log("Data has been received: " + response);
    }, error => {
      console.log(error);
    })
  }

  public chartClicked = (event: any) => {
    console.log(event);
    this.signalRService.broadcastChartData();

  }
}
