import { Routes } from '@angular/router';
import {StockModule} from './dashboard/stocks/stock-module'
export const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth').then((m) => m.Auth),
    children: [

      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./auth/register/register').then((m) => m.Register),
      },
    ]


  },
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome').then((m) => m.Welcome),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
    children: [

      {
        path: 'stocks',
        loadChildren: () =>
          import('./dashboard/stocks/stock-module').then(m => m.StockModule)

      },
      {
        path:'setting',
        loadComponent: () =>
          import('./dashboard/setting/setting').then((m) => m.Setting),
      }
    ]
  },



];
