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
  fileEvent(fileInput: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (this.sheet === "DangVien") {
      const dangVienData = this.excelService.getDangVienDataFromExcel(
        file.name,
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
      this.objs = this.excelService.excelFileToData(file.name, this.sheet);
    }
    console.log(this.objs);
  }
}
