import { NgModule } from '@angular/core';
import { NbCardModule} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
  ], 
  declarations: [
    HomeComponent
  ],
})
export class HomeModule { }
