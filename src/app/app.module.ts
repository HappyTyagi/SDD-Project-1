import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule }   from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserManagementComponent } from './user-management/user-management.component';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { HttpHeaderInterceptorService } from './core/interceptors/http-header.interceptor';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserManagementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
