import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { HomeComponent } from './home.component';
import { OrdersComponent } from './orders-chart/orders.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbIconModule,
  ], 
  declarations: [
    HomeComponent,
    OrdersComponent,
    CustomerOrderComponent
  ],
})
export class HomeModule { }
