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



];
