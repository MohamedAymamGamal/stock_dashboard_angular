import { Routes } from '@angular/router';


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
        loadComponent: () =>
          import('./dashboard/stocks/stocks').then((m) => m.StocksComponent),
      },
      {
        path: 'stocks/create',
        loadComponent: () =>
          import('./dashboard/stocks/create-stock/create-stock').then((m) => m.CreateStock),
        // canDeactivate: [dirtyFormGuard],
      },
      {
        path: 'stocks/:id',
        loadComponent: () =>
          import('./dashboard/stocks/stock-details/stock-details').then((m) => m.StockDetails),
      }
    ]
  },



];
