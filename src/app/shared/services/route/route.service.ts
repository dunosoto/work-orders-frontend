import { Injectable } from '@angular/core';
import { RoutesByArea, RoutesByRole } from '../../models/routes-by-role.model';
import { Router } from '@angular/router';
import { GetUserResponse } from '../../models/user/user.model';
import { routesByRoles, routesbyAreas } from 'src/environments/environment';
import { RoleEnumId } from '../../enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  
  private routesByRole: RoutesByRole[] = routesByRoles;
  private routesByArea: RoutesByArea[] = routesbyAreas;
  private firstIndexToArea: number = 0;
  public userRoleId = RoleEnumId;
  
  constructor(
    private router: Router
  ) { }

  public userRedirectTo(user: GetUserResponse): void {
    const route: string = this.getCurrentRouteByRole(user) as string;
    if (user && user.role.id !== this.userRoleId.SUPERVISOR && user.role.id !== this.userRoleId.AUX_MDF) {
      this.router.navigate([route]);
      return;
    }

    // this.redirectToByArea(user, route);

  }

  // private redirectToByArea(user: GetUserResponse, route: string): void {
  //   const firstArea: IArea = user.area[this.firstIndexToArea];
  //   const routeMap: Map<number, string> = this.getRouteByRoleOrAreaMap(this.routesByArea);
  //   const currentSubRoute: string = routeMap.get(firstArea.id) as string;
  //   this.router.navigate([route + currentSubRoute]);
  // }

  private getCurrentRouteByRole(user: GetUserResponse): string | undefined {
    const routeMap: Map<number, string> = this.getRouteByRoleOrAreaMap(this.routesByRole);
    return routeMap.get(user.role.id);
  }

  private getRouteByRoleOrAreaMap(routesByRoles: RoutesByRole[] | RoutesByArea[]): Map<number, string> {
    return new Map(
      routesByRoles.map((route: RoutesByRole) => [route.roleId, route.route])
    );
  }

}
