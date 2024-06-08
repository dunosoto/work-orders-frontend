import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';


const routes: Routes = [
  { path: '', component: ClientComponent },
  {
    path: 'address/:id',
    loadChildren: () => import('./address/address.module').then(m => m.AddressModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
