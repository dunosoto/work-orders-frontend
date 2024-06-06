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



@NgModule({
  declarations: [
    SidenavComponent,
    RouteSectionComponent,
    TitleSectionComponent,
    FilterComponent,
    FilterUserByUserNamePipe
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
    FilterUserByUserNamePipe
  ]
})
export class SharedModule { }
