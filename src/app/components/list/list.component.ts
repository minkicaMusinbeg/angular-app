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
  constructor(
    private dialog: MatDialog, public userListService: ListService
  ) {}

ngOnInit() {
    this.userList = this.userListService.getUsers();
  }
  async createNewUser() {

      const { success, userData } = await this.openUserModal();
      if (success) {
        this.userList.push(userData);
      }
  }

  async updateUser(user: PROFILE) {
    try {
      const { success, userData } = await this.openUserModal(user);
      if (success) {
        const userIndex = this.userList.findIndex(
          (usr) => usr?.id === user?.id
        );
        if (userIndex >= 0) {
          this.userList[userIndex] = userData;
        }
      }
    } catch (error: any) {
    }
  }
  async deleteUser(userData: PROFILE) {

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
