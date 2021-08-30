import { Component } from '@angular/core';
import { CoreHttpService } from './core/services/coreHttpServices/core-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SDD';
  constructor(public coreHttp: CoreHttpService) {
    this.coreHttp.getData().subscribe(res=> {
      console.log(res)
    })
  }
}
