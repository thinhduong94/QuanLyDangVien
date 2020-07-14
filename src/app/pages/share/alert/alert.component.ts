import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class alertComponent implements OnInit {
  mess : string = '';
  title : string = 'Thông báo';
  constructor(
    public dialogRef: MatDialogRef<alertComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.mess = this.data.mess;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
