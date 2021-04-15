import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import { 
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbSidebarModule,
  NbLayoutModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { AuthComponent } from './auth/auth.component';
import { NgxLoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbCardModule,
    NbAuthModule,
    NbSidebarModule.forRoot(),
    NbLayoutModule,
    NbSpinnerModule,
  ],
  declarations: [
    AuthComponent,
    NgxLoginComponent,
  ],
  providers: [
  ]
})
export class NgxAuthModule {
}