import { RoutesByArea, RoutesByRole } from "src/app/shared/models/routes-by-role.model";

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/'
};

export const routesByRoles: RoutesByRole[] = [
  { roleId: 1 , route: 'admin/'},
  { roleId: 2 , route: 'ordenes/'}, //supervisor
  { roleId: 3 , route: 'login'}, //tecnicos de cuadrilla
  { roleId: 4 , route: 'login'}, //tecnicos de cuadrilla responsable
  { roleId: 5 , route: 'ordenes/'}, //auxiliares mdf
];

export const routesbyAreas: RoutesByArea[] = [
  { roleId: 3 , route: 'provisiones'}
];
