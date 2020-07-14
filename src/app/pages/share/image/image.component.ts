import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class imageComponent implements OnInit {
  imgSrc : string = '';
  title : string = 'Hình ảnh';
  constructor(
    public dialogRef: MatDialogRef<imageComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.imgSrc = this.data.img;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
