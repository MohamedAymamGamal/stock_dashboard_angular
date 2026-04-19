import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [


          {
            path: '',
            loadComponent: () =>
              import('./stocks').then(m => m.StocksComponent),
          },
  {
    path: 'form-array',
    loadComponent: () =>
      import('./form-array/form-array').then(m => m.FormArrays),
  },
          {
            path: 'create',
            loadComponent: () =>
              import('./create-stock/create-stock').then(m => m.CreateStock),
          },
          {
            path: 'update/:id',
            loadComponent: () =>
              import('./update-stock/update-stock').then(m => m.UpdateStock),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./stock-details/stock-details').then(m => m.StockDetails),
          },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
