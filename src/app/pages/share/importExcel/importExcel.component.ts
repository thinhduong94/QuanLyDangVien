import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import * as xlsx from "xlsx";
import { ExcelService } from "src/app/service/excel.service";
import { DangVienService } from "src/app/service/dangvien.service";
import { alertComponent } from "../alert/alert.component";
import { DangVienModel } from "src/app/model/dangvien.model";
@Component({
  selector: "app-importExcel",
  templateUrl: "./importExcel.component.html",
})
export class importExcelComponent implements OnInit {
  title: string = "File";
  sheet: string = "";
  objs: any[] = [];
  arrayBuffer;
  constructor(
    public dialogRef: MatDialogRef<importExcelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public excelService: ExcelService,
    private dangVienService: DangVienService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.sheet = this.data.sheet;
  }
  onNoClick(): void {
    this.dialogRef.close(this.objs);
  }
  fileEvent(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();    
    reader.onload = (e: any) => {
      const bstr = e.target.result;
      if (this.sheet === "DangVien") {
        const dangVienData = this.excelService.getDangVienDataFromExcel(
          bstr,
          this.sheet
        );
        dangVienData.forEach((dangVien: DangVienModel) => {
          const { soTheDangVien = 0 } = dangVien;
          this.dangVienService
            .getBySoTheDangVien(+soTheDangVien)
            .then((foundDangVien) => {
              if (!foundDangVien) {
                this.dangVienService.insert(dangVien).then((res) => {
                  console.log(`inserted dang vien ${dangVien.tenDangDung}`);
                });
              }
            });
        });
      } else {
        this.objs = this.excelService.excelFileToData(bstr, this.sheet);
      }
      console.log(this.objs);
    }
    reader.readAsBinaryString(target.files[0]);
  }
}
