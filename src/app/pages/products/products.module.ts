import { NgModule } from "@angular/core";
import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbMenuModule } from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products.component";
import { GridJsAngularModule } from 'gridjs-angular';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
    imports: [
      ThemeModule,
      NbCardModule,
      ProductRoutingModule,
      NbIconModule,
      NbButtonModule,
      GridJsAngularModule,
      NbActionsModule,
      NbInputModule,
    ],
    declarations: [
      ProductsComponent,
      ProductListComponent,
      ProductDetailsComponent,
    ],
  })
  export class ProductModule {
  }