import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { EditRoleComponent } from './components/edit-role/edit-role.component';
import { RoleDataComponent } from './components/role-data/role-data.component';
import { RoleRoutingModule } from './role-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



@NgModule({
  declarations: [
    RoleComponent,
    EditRoleComponent,
    RoleDataComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    SharedModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module
  ]
})
export class RoleModule { }
