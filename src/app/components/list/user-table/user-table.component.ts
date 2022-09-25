import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  @Output() delete = new EventEmitter<PROFILE>();
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
    // private globalData: GlobalDataService,
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
    console.log("parametri", data);
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

}
