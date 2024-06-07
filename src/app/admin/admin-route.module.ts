import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserRoleId } from '../shared/enums/role.enum';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'usuarios' },
      {
        path: 'usuarios',
        // canActivateChild: [PermissionGuard],
        data: {
          idRoles: [UserRoleId.ADMINISTRATOR]
        },
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'grupos',
        // canActivateChild: [PermissionGuard],
        data: {
          idRoles: [UserRoleId.ADMINISTRATOR]
        },
        loadChildren: () => import('./group/group.module').then(m => m.GroupModule)
      },
      // {
      //   path: 'roles',
      //   canActivateChild: [PermissionGuard],
      //   data: {
      //     idRoles: [UserRoleId.ADMINISTRATOR]
      //   },
      //   loadChildren: () => import('./rol/rol.module').then(m => m.RolModule)
      // },
      // {
      //   path: 'etiquetas',
      //   canActivateChild: [PermissionGuard],
      //   data: {
      //     idRoles: [UserRoleId.ADMINISTRATOR]
      //   },
      //   loadChildren: () => import('./label/label.module').then(m => m.LabelModule)
      // },
      // {
      //   path: 'clientes',
      //   canActivateChild: [PermissionGuard],
      //   data: {
      //     idRoles: [UserRoleId.ADMINISTRATOR]
      //   },
      //   loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
      // },
      // {
      //   path: 'actividad',
      //   canActivateChild: [PermissionGuard],
      //   data: {
      //     idRoles: [UserRoleId.ADMINISTRATOR]
      //   },
      //   loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule)
      // },
    ]
  },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRouteModule { }
