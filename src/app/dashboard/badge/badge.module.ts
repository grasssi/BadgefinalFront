import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeRoutingModule } from './badge-routing.module';
import { BadgeComponent } from './badge.component';
import { AddbadgeComponent } from './addbadge/addbadge.component';
import { AddefccmComponent } from './addefccm/addefccm.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListbadgeComponent } from './listbadge/listbadge.component';

@NgModule({
  declarations: [
    BadgeComponent,
    AddbadgeComponent,
    AddefccmComponent,
    ListbadgeComponent
  ],
  imports: [
    CommonModule,
    BadgeRoutingModule,
    SharedModule
  ]
})
export class BadgeModule { }
