import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html'
})
export class confirmComponent implements OnInit {
  mess : string = '';
  title : string = 'Thông báo';
  constructor(
    public dialogRef: MatDialogRef<confirmComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.mess = this.data.mess;
  }
  onNoClick(status:string): void {
    this.dialogRef.close(status);
  }
}
