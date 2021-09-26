import { Component, OnInit } from '@angular/core';
import { CoreHttpService } from '../core/services/coreHttpServices/core-http.service';
import { NotificationService } from '../core/services/notification.service';
import { DashboardDatamodel } from '../models/common.model';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
public dashboardData : DashboardDatamodel = new DashboardDatamodel();
public barChartOptions = {
  scaleShowVerticalLines: false,
  responsive: true
};
public barChartLabels = ["April", "May", "June", "July", "August"];
public barChartType = 'bar';
public barChartLegend = true;
public barChartData = [{ data: [65, 54, 78, 75, 77], label: 'Performance 2021' }];
public barColors = [{backgroundColor: [ "#4568dc",
    "#b06ab3",
     "#45B649",
     "#ff7e5f",
     "#feb47b",]}]

lineChartData: ChartDataSets[] = [
  { data: [7,8,8,9,9,9,10,11,14,14,15], label: 'Registration 2021' },
];

lineChartLabels: Label[] = ["50","60","70","80","90","100","110","120","130","140","150"];

lineChartOptions = {
  responsive: true,
  fill: false
};

lineChartColors: Color[] = [
  {
    borderColor: "#45B649",
    backgroundColor: "",
  },
];

lineChartLegend = false;
lineChartPlugins = [];
lineChartType = 'line';
  constructor(private coreHttp: CoreHttpService, private notifyService: NotificationService) {
    this.getAllDashboardData();
  }

  ngOnInit(): void {
    // var xValues = ["April", "May", "June", "July", "August"];
    // var yValues = [55, 49, 44, 24, 15];
    // var barColors = [
    //     "#4568dc",
    //     "#b06ab3",
    //     "#45B649",
    //     "#ff7e5f",
    //     "#feb47b",
    //   ];

    // new Chart("barChart", {
    //     type: "bar",
    //     data: {
    //         labels: xValues,
    //         datasets: [{
    //             label: 'Performance 2021',
    //             backgroundColor: barColors,
    //             data: yValues
    //         }]
    //     },
    //     options: {
    //         responsive: true,
    //         plugins:{
    //             legend: {
    //                 display: true,
    //                 position: 'bottom'
    //             }
    //         }
    //     }
    // });


    // //line chart
    // var xValues = [50,60,70,80,90,100,110,120,130,140,150];
    // var yValues = [7,8,8,9,9,9,10,11,14,14,15];

    // new Chart("lineChart", {
    // type: "line",
    // data: {
    //     labels: xValues,
    //     datasets: [{
    //         label: 'Registration 2021',
    //         backgroundColor: "#45B649",
    //         borderColor: "#45B649",
    //         data: yValues
    //     }]
    // },
    // options:{
    //     responsive: true,
    //     plugins:{
    //         legend: {
    //             display: true,
    //             position: 'bottom',
    //         }
    //     }
    // }
    // });
  }

  /** Method to get all dashboard data */
  getAllDashboardData() {
    this.coreHttp.get('patient/getAllDashBoardData').subscribe(response => {
      console.log(response.response);
      this.dashboardData = response.response;
    }, error => {
      this.notifyService.showError(error.message)
    })
  }

}
