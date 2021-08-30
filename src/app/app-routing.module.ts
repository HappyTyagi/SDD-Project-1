import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AuthenticationGuard } from './core/guards/authentication.guard';

const routes: Routes = [
   {path: '', redirectTo: '/login', pathMatch: 'full'},
   {
     path: 'login',
     component: LoginComponent
   },
   {path: 'user-management',
   component: UserManagementComponent, canActivate:[AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
