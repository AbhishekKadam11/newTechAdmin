import { NgModule } from '@angular/core';
import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbListModule, NbProgressBarModule, NbSpinnerModule, NbTabsetModule, NbUserModule} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { HomeComponent } from './home.component';
import { OrdersComponent } from './orders-chart/orders.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';
import { CountryOrdersComponent } from './country-orders/country-orders.component';
import { CountryOrdersMapService } from './country-orders/map/country-orders-map.service';
import { CountryOrdersMapComponent } from './country-orders/map/country-orders-map.component';
import { CountryOrdersChartComponent } from './country-orders/chart/country-orders-chart.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ChartModule } from 'angular2-chartjs';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbIconModule,
    NbListModule,
    NbTabsetModule,
    NbUserModule,
    NbActionsModule,
    LeafletModule,
    ChartModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    NbButtonModule,
    NbSpinnerModule,
  ], 
  declarations: [
    HomeComponent,
    OrdersComponent,
    CustomerOrderComponent,
    CountryOrdersComponent,
    CountryOrdersMapComponent,
    CountryOrdersChartComponent,
    OrderSummaryComponent,
  ],
  providers: [
    CountryOrdersMapService,
  ],
})
export class HomeModule { }
