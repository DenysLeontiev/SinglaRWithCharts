import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { ChartModel } from '../_interfaces/chartModel';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: ChartModel[] = [];
  public broadcastData: ChartModel[] = [];

  private hubConnection!: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7122/chart")
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log("Connection has started successfully");
      })
      .catch((ex) => {
        console.log("An error occured during openning: " + ex);
      });
  }


  public addTransferChartDataList = () => {
    this.hubConnection.on("transferChartData", (data) => {
      this.data = data;
      console.log(data);
    })
  }

  public broadcastChartData = () => {
    const data = this.data.map(m => { // loop through out this.data array
      const temp = {
        data: m.data,
        label: m.label,
      };
    });

    // invoke or send? Difference
    this.hubConnection.invoke("BroadcastChartData", data)
      .then(() => {
        console.log("Data is received");
      }).catch((ex) => {
        console.log("An error has occured: " + ex);
      });
  };

  public addBroadcastChartDataListener = () => {
    this.hubConnection.on("transferChartData", (data) => { // BroadcastChartData
      this.broadcastData = data;
    })
  };

  constructor() { }
}
