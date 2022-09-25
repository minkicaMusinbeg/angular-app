import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../modals/user-modal/user-modal.component';

export interface USER {
  id: number;
  email: string;
}
export interface PROFILE extends USER {
  userId: string;
  fullName: string;
  role: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  userList: PROFILE[] = [{
    userId: "0b3bce4f-36f6-4d64-afe0-d508977d32a7",
    email: "almina@email.com",
    fullName: "Musinbegovic",
    role: 1,
    id: 18
  }];
  constructor(
    private dialog: MatDialog,
  ) {}

ngOnInit() {
    // this.userList = await this.userListService.getAllUsers();
  }
  async createNewUser() {
    try {
      const { success, userData } = await this.openUserModal();
      if (success) {
        this.userList.push(userData);
      }
    } catch (error: any) {
      // this.messageService.show({
      //   message: error?.message || 'An error occoured when creating new user',
      // });
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
          // this.messageService.show({
          //   message: `User (${userData?.fullName}) has been updated successfully`,
          //   duration: 4000,
          // });
        }
      }
    } catch (error: any) {
      // this.messageService.show({
      //   message: error?.message || 'An error occoured when updating  user',
      // });
    }
  }
  async deleteUser(userData: PROFILE) {
    // const { success } = await this.userListService.deleteUser(userData?.id);
    // if (success) {
    //   const userIndex = this.userList.findIndex(
    //     (usr) => usr.id === userData?.id
    //   );
    //   if (userIndex >= 0) {
    //     this.userList.splice(userIndex, 1);
    //     this.messageService.show({
    //       message: `User (${userData?.fullName}) has been removed successfully`,
    //     });
    //   }
    // }
  }
  // OPEN MODAL WITH SOME CONFIGRATION
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
