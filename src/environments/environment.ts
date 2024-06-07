import { RoutesByArea, RoutesByRole } from "src/app/shared/models/routes-by-role.model";

export const environment = {
  firebase: {
    projectId: 'cotel-2646f',
    appId: '1:400664981065:web:5d2313cba6316d08269998',
    storageBucket: 'cotel-2646f.appspot.com',
    apiKey: 'AIzaSyANGebfY06wnjnth72UInWIHSz4Wg3HMU8',
    authDomain: 'cotel-2646f.firebaseapp.com',
    messagingSenderId: '400664981065',
    measurementId: 'G-MV5H6DRBZF',
  },
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
