import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';

export const routes: Routes = [
    {
        path: '',
        component: NbAuthComponent,  // <---
    },
    {
        path: 'auth',
        loadChildren: './auth/auth.module#NgxAuthModule',
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}