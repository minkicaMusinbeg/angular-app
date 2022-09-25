import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListService } from 'src/app/services/list/list.service';
import { PROFILE } from '../../list/list.component';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  constructor(
    public userListService: ListService,
    private dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PROFILE
  ) {}
  async save(formData: PROFILE) {
      this.dialogRef.close({ success: true, userData: formData });
}
closeModal(){
  this.dialogRef.close();
}
  ngOnInit(): void {}

}
