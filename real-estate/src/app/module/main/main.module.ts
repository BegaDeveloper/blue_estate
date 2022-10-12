import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule, routingLinks } from './main-routing.module';
import { DashComponent } from './components/dash/dash.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [routingLinks, DashComponent],
  imports: [CommonModule, MainRoutingModule, FormsModule, ReactiveFormsModule],
})
export class MainModule {}
