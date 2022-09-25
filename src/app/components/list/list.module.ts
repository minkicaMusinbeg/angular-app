import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { UserModalComponent } from '../modals/user-modal/user-modal.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserFormComponent } from './user-form/user-form.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListComponent, UserModalComponent, UserTableComponent, UserFormComponent
  ],
  imports: [
    SharedModule,
    CommonModule
  ],
  providers: [],
})
export class ListModule { }
