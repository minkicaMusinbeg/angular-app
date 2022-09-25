import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserModalComponent } from '../../modals/user-modal/user-modal.component';
import { PROFILE } from '../list.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  // private readonly userRoles = environment?.userRoles;
  @Input() userList!:  PROFILE[];
  @Output() update = new EventEmitter<PROFILE>();
  parametri: {
    sort: string,
    search: string
  } =  {sort : '', search: ''}
  sorting : string[] = ['A-Z','Z-A']
  public dataSource!: MatTableDataSource<any>;
    @ViewChild('paginator')
  paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'username','edit', 'delete'];
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource(this.userList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: PROFILE, filter: string) => data['fullName'][0].toLocaleLowerCase() === filter[0];
  }


  visualizeUserRole(roleIndex: number | undefined): string {
    // return this.userRoles[roleIndex ? roleIndex : 0];
    return '';
  }
  searchAndSort(data:any){
    if (this.parametri.search != ''){
      this.dataSource.filter = data.search.trim().toLocaleLowerCase();
    }
    if (this.parametri.sort != ''){
      if (this.parametri.sort == 'A-Z'){
        this.dataSource.data = this.userList.sort((a: any, b: any) =>
        a.fullName.localeCompare(b.fullName, 'tr'));
      }
      if (this.parametri.sort == 'Z-A'){
        this.dataSource.data = this.userList.sort((a: any, b: any) =>
        b.fullName.localeCompare(a.fullName, 'tr'));
      }
    }
  }
  async createNewUser() {

    const { success, userData } = await this.openUserModal();
    if (success) {
      userData.id = this.userList.length+1;
      this.userList.push(userData);
      this.dataSource = new MatTableDataSource(this.userList);
    }
}
  deleteUser(userData: PROFILE) {
    this.userList.forEach((element,index)=>{
      if(element.id===userData.id){
        this.userList.splice(index,1);
      }
   });
          this.dataSource = new MatTableDataSource(this.userList);
  }
  async updateUser(user: PROFILE) {
    try {
      const { success, userData } = await this.openUserModal(user);
      if (success) {
        const userIndex = this.userList.map(x=>x.id).indexOf(userData.id);
        if (userIndex >= 0) {
          this.userList[userIndex] = userData;
        }
        this.dataSource = new MatTableDataSource(this.userList);
      }
    } catch (error: any) {
      console.log("error",error);
    }
  }
  private async openUserModal(user?: PROFILE) {
    const userDialog = this.dialog.open(UserModalComponent , {
      width: '450px',
      maxWidth: '100%',
      data: user,
      disableClose: true,
    });
    return await userDialog.afterClosed().toPromise();
  }

}
