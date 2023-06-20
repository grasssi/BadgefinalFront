import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BadgeComponent } from './badge.component';
import { ProductDetailComponent } from '../product/product-detail/product-detail.component';
import { AddbadgeComponent } from './addbadge/addbadge.component';
import { AddefccmComponent } from './addefccm/addefccm.component';
import { ListbadgeComponent } from './listbadge/listbadge.component';

const routes: Routes = [
  { 
    path: '',
   component: BadgeComponent 
  },
  {
    path: 'addbadge',
    component: AddbadgeComponent
  },
  {
    path: 'addefccm',
    component: AddefccmComponent
  },
  {
    path: 'listbadge',
    component: ListbadgeComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BadgeRoutingModule { }
