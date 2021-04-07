import { NgModule } from "@angular/core";
import { NbActionsModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbListModule, NbMenuModule, NbUserModule } from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { GridJsAngularModule } from 'gridjs-angular';
import { NgxEditorModule } from "ngx-editor";
import { ReactiveFormsModule } from "@angular/forms";
import { CustomerComponent } from "./customer.component";
import { CustomerRoutingModule } from "./customer-routing.module";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { CustomerDetailsComponent } from "./customer-details/customer-details.component";

@NgModule({
    imports: [
        ThemeModule,
        NbCardModule,
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
        CustomerRoutingModule,
    ],
    declarations: [
        CustomerComponent,
        CustomerListComponent,
        CustomerDetailsComponent
    ],
})
export class CustomerModule {
}