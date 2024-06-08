import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import { RouteSectionComponent } from './components/route-section/route-section.component';
import { TitleSectionComponent } from './components/title-section/title-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter/filter.component';
import { FilterUserByUserNamePipe } from './pipes/user/filter-user-by-user-name.pipe';
import { FilterGroupByPrefixPipe } from './pipes/group/filter-group-by-prefix.pipe';
import { FilterUserByRolePipe } from './pipes/user/filter-user-by-role.pipe';
import { FilterByFirstSelectedTrcPipe } from './pipes/group/filter-by-first-selected-trc.pipe';
import { FilterRoleByNamePipe } from './pipes/role/filter-role-by-name.pipe';
import { FilterClientByNamePipe } from './pipes/client/filter-client-by-name.pipe';
import { FilterClientByIdPipe } from './pipes/client/filter-client-by-id.pipe';
import { ClientAddressDataComponent } from './components/client-address-data/client-address-data.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { GoogleMapsModule } from '@angular/google-maps';



@NgModule({
  declarations: [
    SidenavComponent,
    RouteSectionComponent,
    TitleSectionComponent,
    FilterComponent,
    FilterUserByUserNamePipe,
    FilterGroupByPrefixPipe,
    FilterUserByRolePipe,
    FilterByFirstSelectedTrcPipe,
    FilterRoleByNamePipe,
    FilterClientByNamePipe,
    FilterClientByIdPipe,
    ClientAddressDataComponent,
    GoogleMapsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule,
    GoogleMapsModule,
  ],
  exports: [
    SidenavComponent,
    RouteSectionComponent,
    TitleSectionComponent,
    FilterComponent,
    FilterUserByUserNamePipe,
    FilterGroupByPrefixPipe,
    FilterUserByRolePipe,
    FilterByFirstSelectedTrcPipe,
    FilterRoleByNamePipe,
    FilterClientByNamePipe,
    FilterClientByIdPipe,
    ClientAddressDataComponent,
    GoogleMapsComponent,
  ]
})
export class SharedModule { }
