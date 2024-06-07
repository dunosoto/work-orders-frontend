import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import { RouteSectionComponent } from './components/route-section/route-section.component';
import { TitleSectionComponent } from './components/title-section/title-section.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter/filter.component';
import { FilterUserByUserNamePipe } from './pipes/user/filter-user-by-user-name.pipe';
import { FilterGroupByPrefixPipe } from './pipes/group/filter-group-by-prefix.pipe';
import { FilterUserByRolePipe } from './pipes/user/filter-user-by-role.pipe';
import { FilterByFirstSelectedTrcPipe } from './pipes/group/filter-by-first-selected-trc.pipe';
import { FilterRoleByNamePipe } from './pipes/role/filter-role-by-name.pipe';



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
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularMaterialModule
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
  ]
})
export class SharedModule { }
