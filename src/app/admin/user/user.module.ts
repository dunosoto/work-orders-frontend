import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { UserDataComponent } from './components/user-data/user-data.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user/user.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    UserComponent,
    AddUserComponent,
    UserDataComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMaterialModule,
    SweetAlert2Module,
    HttpClientModule,
  ],
  providers:[
    UserService
  ]
})
export class UserModule { }
