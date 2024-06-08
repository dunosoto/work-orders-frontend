import { NgModule } from '@angular/core';
import { AddressComponent } from './address.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AddressComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
