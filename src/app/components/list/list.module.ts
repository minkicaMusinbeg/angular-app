import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { UserModalComponent } from '../modals/user-modal/user-modal.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserFormComponent } from './user-form/user-form.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ListRoutingModule } from './list-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    ListComponent, UserModalComponent, UserTableComponent, UserFormComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ListRoutingModule
  ],
  providers: [],
})
export class ListModule { }
