import { Component, OnInit } from '@angular/core';
import { Login } from '../models/common.model';
import { Subject } from 'rxjs';
import { NotificationService } from '../core/services/notification.service';
import { CoreHttpService } from '../core/services/coreHttpServices/core-http.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  public loginPayload: Login = new Login();

  constructor(private coreHttp: CoreHttpService, private route:Router, private notifyService : NotificationService) { }

  ngOnInit(): void {
  }

  /** Method to logging user */
  onSubmit() {
    this.coreHttp.post('user/login', this.loginPayload).pipe(takeUntil(this.unsubscribe$)).subscribe((res : any) => {
      if(res.status === 200) {
        localStorage.setItem('token', res.response.token);
        this.route.navigate(['/user-management']);
      }
    }, error=> {
      console.log(error);
      this.notifyService.showError(error.message)
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
