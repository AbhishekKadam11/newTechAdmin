import { NgModule } from "@angular/core";
import { NbActionsModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbListModule, NbMenuModule, NbRadioModule, NbTabsetModule, NbUserModule } from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { GridJsAngularModule } from 'gridjs-angular';
import { OrdersRoutingModule } from "./orders-routing.module";
import { OrdersComponent } from "./orders.component";
import { OrdersListComponent } from './orders-list/orders-list.component';
import { ProductOrderListComponent } from './product-order-list/product-order-list.component';

@NgModule({
    imports: [
        ThemeModule,
        NbCardModule,
        NbButtonModule,
        GridJsAngularModule,
        NbActionsModule,
        NbListModule,
        NbDialogModule.forChild(),
        OrdersRoutingModule,
        NbTabsetModule,
    ],
    declarations: [
        OrdersComponent,
        OrdersListComponent,
        ProductOrderListComponent,

    ],
})
export class OrdersModule {
}