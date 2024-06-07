import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group.component';
import { GroupRoutingModule } from './group-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AvatarModule } from 'ngx-avatar';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { EditGroupComponent } from './components/edit-group/edit-group.component';
import { GroupDataComponent } from './components/group-data/group-data.component';



@NgModule({
  declarations: [
    GroupComponent,
    AddGroupComponent,
    EditGroupComponent,
    GroupDataComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    SharedModule,
    AngularMaterialModule,
    // AvatarModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module
  ],
  providers: [
    UserService
  ]
})
export class GroupModule { }
