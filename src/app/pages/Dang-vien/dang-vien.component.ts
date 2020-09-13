import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { TheDb } from "src/app/model/thedb";
import { DangVienService } from "src/app/service/dangvien.service";
import { MatTableDataSource } from "@angular/material/table";
import { DangVienModel } from "src/app/model/dangvien.model";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { DangVienFormDialog } from "./dang-vien-form-dialog/dang-vien-form-dialog.component";
import { ExcelService } from "src/app/service/excel.service";
import { alertComponent } from "../share/alert/alert.component";
import { importExcelComponent } from "../share/importExcel/importExcel.component";
import { confirmComponent } from "../share/confirm/confirm.component";
import { DanToc, GioiTinh } from "src/app/const/drop-down-data.const";

@Component({
  selector: "dang-vien",
  templateUrl: "dang-vien.component.html",
  styleUrls: ["dang-vien.component.scss"],
})
export class DangVienComponent implements OnInit, OnDestroy {
  constructor(
    private dangVienService: DangVienService,
    public dialog: MatDialog,
    private excelService: ExcelService
  ) {}
  displayedColumns: string[] = [
    "soLyLich",
    "soTheDangVien",
    "tenDangDung",
    "gioiTinh",
    "noiSinh",
    "queQuan",
    "thuongTru",
    "danToc",
    "tonGiao",
    "ngheNghiep",
    "ngayVaoDang",
    "action",
  ];
  dataSource = new MatTableDataSource<DangVienModel>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  animal;
  name;
  dangVienDangChon: DangVienModel;
  danhSachDangVien: DangVienModel[] = [];
  ngOnDestroy() {}
  ngOnInit() {
    const checkDB = setInterval(() => {
      if (TheDb.db) {
        this.getDangVien();
        clearInterval(checkDB);
      }
    }, 10);
  }

  getDangVien() {
    this.dangVienService.getAll().then((danhSachDangVien) => {
      console.log(danhSachDangVien);
      this.danhSachDangVien = danhSachDangVien;
      this.loadData();
    });
  }

  loadData() {
    this.danhSachDangVien.forEach((dv) => {
      dv.danToc = DanToc[`display${dv.danToc}`];
      dv.gioiTinh = GioiTinh[`display${dv.gioiTinh}`];
    });
    this.dataSource = new MatTableDataSource<DangVienModel>(
      this.danhSachDangVien
    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: DangVienModel, filter: string) => {
      return data.soTheDangVien.toLocaleLowerCase().match(filter)||data.tenDangDung.toLocaleLowerCase().match(filter) ? true: false;
    };
  }

  deleteDangVien(id: number) {
    const mess = "Bạn có muốn xoá đảng viên này không ?";
    const dialogRef = this.dialog.open(confirmComponent, {
      data: { mess: mess || null },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "yes") {
        this.dangVienService.delete(id).then(() => {
          this.getDangVien();
        });
      }
      console.log("The dialog was closed");
    });
  }

  selectItem(id: number) {
    console.log(id);
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DangVienFormDialog, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getDangVien();
    });
  }

  exportDangVien() {
    this.excelService.exportAsExcelFile(this.danhSachDangVien, "DangVien");
  }

  importDangVien() {
    const dialogRef = this.dialog.open(importExcelComponent, {
      width: "500px",
      data: { sheet: "DangVien" },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.getDangVien();
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim()
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
