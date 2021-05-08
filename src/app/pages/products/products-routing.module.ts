import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../authentication/service/auth-guard.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    canActivateChild: [AuthGuardService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProductListComponent,
        data: { roles: ["Admin", "User"] }
      },
      {
        path: 'details/:id',
        component: ProductDetailsComponent,
        data: { roles: ["Admin", "User"] }
      }
    ]
  },
  {
    path: 'upload',
    component: ProductDetailsComponent,
    data: { roles: ["Admin"] }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ProductRoutingModule {
}

