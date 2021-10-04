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
public barChartLabels = [];
public barChartType = 'bar';
public barChartLegend = true;
public barChartData = [];
public barColors = [{backgroundColor: [ "#4568df",
    "#b06ab3",
     "#45B549",
     "#ff7e5f",
     "#feb47b"]}]


lineChartData: ChartDataSets[] = [];
motherChartData: ChartDataSets[] = [];

lineChartLabels: Label[] = [];
motherChartLabels: Label[] = [];

lineChartOptions = {
  responsive: true,
  fill: false
};

lineChartColors: Color[] = [
  {
    borderColor: "#45B649",
    backgroundColor: null,
  },
];

lineChartLegend = true;
lineChartPlugins = [];
lineChartType = 'line';
  constructor(private coreHttp: CoreHttpService, private notifyService: NotificationService) {
    this.getAllDashboardData();
  }

  ngOnInit(): void {
  }

  /** Method to get all dashboard data */
  getAllDashboardData() {
    this.coreHttp.get('patient/getAllDashBoardData').subscribe(response => {
      console.log(response.response);
      this.dashboardData = response.response;
      // cho chart
      let barchartData = []
      this.dashboardData.cho.forEach((ele) => {
        this.barChartLabels.push(ele.level);
        barchartData.push(ele.value);
      });
     this.barChartData = [{ data: barchartData, label: 'Performance 2021' }];
    //  child chart
    let childData = [];
     this.dashboardData.child.forEach((ele) => {
      this.lineChartLabels.push(ele.level);
      childData.push(ele.value);
    });
   this.lineChartData = [{ data: childData, label: 'Registration 2021' }];

   // Mother chart
   let motherData = [];
     this.dashboardData.mother.forEach((ele) => {
      this.motherChartLabels.push(ele.level);
      motherData.push(ele.value);
    });
   this.motherChartData = [{ data: motherData, label: 'Registration 2021' }];

    }, error => {
      this.notifyService.showError(error.message)
    })
  }

}
