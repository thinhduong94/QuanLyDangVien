import { Component, OnInit, Inject } from "@angular/core";
import * as html2pdf from "html2pdf.js";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { DialogData } from "../../ChiBo/daiolog/chibo.daiolog";
import { DangVienModel } from "src/app/model/dangvien.model";
import { DangVienFormDialog } from "../dang-vien-form-dialog/dang-vien-form-dialog.component";
import { ChiBoService } from "src/app/service/chibo.service";
import {
  DanhSachGioiTinh,
  DanhSachDanToc,
  DanhSachLyLuanChinhTri,
  DanhSachHuyHieu,
  DanhSachKyLuat,
  DanhSachTinhTrangQuanLy,
} from "src/app/const/drop-down-data.const";

@Component({
  selector: "dang-vien-pdf",
  templateUrl: "dang-vien-pdf.component.html",
  styleUrls: ["dang-vien-pdf.component.scss"],
})
export class DangVienPdf implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DangVienPdf>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dangVienFormDialog: MatDialog,
    private chiBoService: ChiBoService
  ) {}
  dangvien: DangVienModel;
  lyLichArrLeft = [];
  theDangVienLeft = [];
  theDangVienRight = [];
  lyLichArrRight = [];
  imgBase64 = "";
  ngOnInit() {
    if (this.data["dangvien"]) {
      console.log("this.data", this.data);
      this.dangvien = this.data["dangvien"];
    }
    const dangVien = this.data["dangvien"] as DangVienModel;
    const { soLyLich = "", soTheDangVien = "" } = dangVien;
    this.lyLichArrLeft = soLyLich.split("").slice(0, 6);
    this.lyLichArrRight = soLyLich.split("").slice(6, 8);
    this.fillEmptySquare(this.lyLichArrLeft, 6);
    this.fillEmptySquare(this.lyLichArrRight, 2);
    this.theDangVienLeft = soTheDangVien.split("").slice(0, 2);
    this.theDangVienRight = soTheDangVien.split("").slice(2, 8);
    this.fillEmptySquare(this.theDangVienLeft, 2);
    this.fillEmptySquare(this.theDangVienRight, 6);
    this.imgBase64 = dangVien.anh3x4;
    this.chiBoService.getByMaChiBo(this.dangvien.chiBo).then((foundChiBo) => {
      this.dangvien.chiBo = foundChiBo.tenChiBo;
    });
    this.dangvien.gioiTinh = this.getDisplayValue(
      this.dangvien.gioiTinh,
      DanhSachGioiTinh
    );
    this.dangvien.danToc = this.getDisplayValue(
      this.dangvien.danToc,
      DanhSachDanToc
    );
    this.dangvien.lyLuanChinhTri = this.getDisplayValue(
      this.dangvien.lyLuanChinhTri,
      DanhSachLyLuanChinhTri
    );
    this.dangvien.kyLuat = this.getDisplayValue(
      this.dangvien.kyLuat,
      DanhSachKyLuat
    );
  }

  getDisplayValue(value, arr) {
    const result = arr.find((item) => item.value === value);
    return result ? result.display : value;
  }

  generateDoc() {
    const element = document.getElementById("page1");
    const opt = {
      margin: 0,
      filename: "myfile.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    const worker = html2pdf(element, "A4", "en", false, "UTF-8");
    // html2pdf().set(opt).from(element).save();
  }

  fillEmptySquare(arr, fullLength) {
    if (arr.length < fullLength) {
      const loopCount = fullLength - arr.length;
      for (let i = 0; i < loopCount; i++) {
        arr.push("");
      }
    }
  }

  backToDangVienForm() {
    const dialogRef = this.dangVienFormDialog.open(DangVienFormDialog, {
      data: { id: this.dangvien.id },
    });
  }
}
