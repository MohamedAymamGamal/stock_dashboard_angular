import { Routes } from '@angular/router';
import { AuthGuard, WelcomeGuard, DashboardGuard } from './guards/auth.guard';

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
        loadComponent: () => import('./dashboard/stocks/stocks').then((m) => m.Stocks),
      },
      {
        path:'stocks/:id',
        loadComponent: () =>import('./dashboard/stocks/stock-details/stock-details').then((m) => m.StockDetails),
      }
    ]
  },



];
