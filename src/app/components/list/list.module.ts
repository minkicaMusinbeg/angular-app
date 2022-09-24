import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [],
})
export class ListModule { }
