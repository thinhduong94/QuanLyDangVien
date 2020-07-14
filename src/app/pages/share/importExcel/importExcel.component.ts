import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as xlsx from 'xlsx';
import { ExcelService } from 'src/app/service/excel.service';
@Component({
  selector: 'app-importExcel',
  templateUrl: './importExcel.component.html'
})
export class importExcelComponent implements OnInit {
  title : string = 'Hình ảnh';
  sheet : string  = '';
  objs : any[] = [];
  constructor(
    public dialogRef: MatDialogRef<importExcelComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public excelService : ExcelService
  ) { }

  ngOnInit() {
    this.sheet = this.data.sheet;
  }
  onNoClick(): void {
    this.dialogRef.close(this.objs);
  }
  fileEvent(fileInput: Event){
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.objs = this.excelService.excelFileToData(file.name,this.sheet);
    console.log(this.objs);
  }
}
