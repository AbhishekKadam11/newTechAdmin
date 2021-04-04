import { NgModule } from "@angular/core";
import { NbButtonModule, NbCardModule, NbIconModule, NbMenuModule } from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products.component";
import { GridJsAngularModule } from 'gridjs-angular';

@NgModule({
    imports: [
      ThemeModule,
      NbCardModule,
      ProductRoutingModule,
      NbIconModule,
      NbButtonModule,
      GridJsAngularModule,
    ],
    declarations: [
      ProductsComponent,
      ProductListComponent,
    ],
  })
  export class ProductModule {
  }