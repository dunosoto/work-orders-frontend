import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { UpdateClientComponent } from './components/update-client/update-client.component';
import { ClientDataComponent } from './components/client-data/client-data.component';
import { CreateClientServiceComponent } from './components/client-service/create-client-service/create-client-service.component';
import { UpdateClientServiceComponent } from './components/client-service/update-client-service/update-client-service.component';
import { CreateClientAddressComponent } from './components/client-address/create-client-address/create-client-address.component';
import { UpdateClientAddressComponent } from './components/client-address/update-client-address/update-client-address.component';



@NgModule({
  declarations: [
    ClientComponent,
    CreateClientComponent,
    UpdateClientComponent,
    ClientDataComponent,
    CreateClientServiceComponent,
    UpdateClientServiceComponent,
    CreateClientAddressComponent,
    UpdateClientAddressComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class ClientModule { }
