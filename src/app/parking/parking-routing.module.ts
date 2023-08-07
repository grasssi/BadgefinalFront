import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingComponent } from './parking.component';
import {AddparkingComponent} from './addparking/addparking.component';
import {ListparkingComponent} from './listparking/listparking.component';
import {ListbadgebyparkingComponent} from './listbadgebyparking/listbadgebyparking.component';

const routes: Routes = [
  {
   path: '', component: ParkingComponent
   },
   
   {
     path: 'addparking',
     component:AddparkingComponent
   },
   {
     path: 'listbadgebyparking',
     component:  ListbadgebyparkingComponent
   },
   {
     path: 'listparkings',
     component: ListparkingComponent
   }
 
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingRoutingModule { }
