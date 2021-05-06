import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from '../authentication/service/auth-guard.service';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivateChild: [AuthGuardService],
  children: [
    {
      path: 'home',
      component: HomeComponent,
      // canActivate: [AuthGuardService],
      // data: { roles: ["Admin", "User"] }
    },
    {
      path: 'products',
      loadChildren: () => import('./products/products.module')
        .then(m => m.ProductModule),
        // canActivate: [AuthGuardService],
        // data: { roles: ["Admin", "User"] }
    },
    {
      path: 'customer',
      loadChildren: () => import('./customer/customer.module')
        .then(m => m.CustomerModule),
        // canActivate: [AuthGuardService],
        // data: { roles: ["Admin", "User"] }
    },
    {
      path: 'products/upload',
      loadChildren: () => import('./products/products.module')
        .then(m => m.ProductModule),
        canActivate: [AuthGuardService],
        // component:ProductsComponent,
        data: { roles: ["Admin"] }
    },
    {
      path: 'orders',
      loadChildren: () => import('./orders/orders.module')
        .then(m => m.OrdersModule),
        // canActivate: [AuthGuardService],
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
