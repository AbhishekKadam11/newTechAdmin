import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbIconModule,
  ], 
  declarations: [
    HomeComponent
  ],
})
export class HomeModule { }
