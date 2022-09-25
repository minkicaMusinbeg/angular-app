import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListService } from 'src/app/services/list/list.service';
import { UserModalComponent } from '../modals/user-modal/user-modal.component';

export interface USER {
  id: number;
  email: string;
}
export interface PROFILE extends USER {
  fullName: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  userList: PROFILE[] = [];
  constructor(public userListService: ListService
  ) {}

ngOnInit() {
    this.userList = this.userListService.getUsers();
  }

}
