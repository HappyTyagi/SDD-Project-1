import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [LoaderComponent, HeaderComponent, SidebarComponent],
  exports: [LoaderComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
