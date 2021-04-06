import { NgModule } from "@angular/core";
import { NbActionsModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbListModule, NbMenuModule, NbUserModule } from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products.component";
import { GridJsAngularModule } from 'gridjs-angular';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgxEditorModule } from "ngx-editor";
import { AddImageDialogComponent } from './image-dialog/image-dialog.component';
import { ReactiveFormsModule } from "@angular/forms";

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
      NgxEditorModule,
      NbListModule,
      NbUserModule,
      NbDialogModule.forChild(),
      ReactiveFormsModule,
    ],
    declarations: [
      ProductsComponent,
      ProductListComponent,
      ProductDetailsComponent,
      AddImageDialogComponent,
    ],
  })
  export class ProductModule {
  }