import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address.component';
import { AddressRoutingModule } from './address-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { GoogleMapsModule } from '@angular/google-maps';
import { ServiceInfoComponent } from './components/service-info/service-info.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { AddressDataComponent } from './components/address-data/address-data.component';
import { AddressServiceComponent } from './components/address-service/address-service.component';

@NgModule({
  declarations: [
    AddressComponent,
    ServiceInfoComponent,
    ClientInfoComponent,
    AddressDataComponent,
    AddressServiceComponent
  ],
  imports: [
    CommonModule,
    AddressRoutingModule,
    SharedModule,
    AngularMaterialModule,
    SweetAlert2Module,
    GoogleMapsModule
  ]
})
export class AddressModule { }
