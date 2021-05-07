import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from '../authentication/service/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivateChild: [AuthGuardService],
  children: [
    {
      path: 'home',
      component: HomeComponent,
      data: { roles: ["Admin", "User"] }
    },
    {
      path: 'products',
      loadChildren: () => import('./products/products.module')
        .then(m => m.ProductModule),
      // pathMatch: 'full',
      data: { roles: ["Admin", "User"] }
    },
    {
      path: 'customer',
      loadChildren: () => import('./customer/customer.module')
        .then(m => m.CustomerModule),
      data: { roles: ["Admin", "User"] }
    },
    {
      path: 'products/upload',
      loadChildren: () => import('./products/products.module')
        .then(m => m.ProductModule),
      // pathMatch: 'full',
      data: { roles: ["Admin"] }
    },
    // {
    //   path: 'products/details/:id',
    //   loadChildren: () => import('./products/products.module')
    //     .then(m => m.ProductModule),
    //   pathMatch: 'prefix',
    //   data: { roles: ["Admin","User"] }
    // },
    {
      path: 'orders',
      loadChildren: () => import('./orders/orders.module')
        .then(m => m.OrdersModule),
      data: { roles: ["Admin", "User"] }
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
