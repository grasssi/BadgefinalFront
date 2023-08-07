import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParkingRoutingModule } from './parking-routing.module';
import { ParkingComponent } from './parking.component';
import { ListparkingComponent } from './listparking/listparking.component';
import { AddparkingComponent } from './addparking/addparking.component';
import { ListbadgebyparkingComponent } from './listbadgebyparking/listbadgebyparking.component';


@NgModule({
  declarations: [
    ParkingComponent,
    ListparkingComponent,
    AddparkingComponent,
    ListbadgebyparkingComponent
  ],
  imports: [
    CommonModule,
    ParkingRoutingModule
  ]
})
export class ParkingModule { }
