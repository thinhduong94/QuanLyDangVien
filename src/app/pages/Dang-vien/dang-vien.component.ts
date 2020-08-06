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
    this.dataSource = new MatTableDataSource<DangVienModel>(
      this.danhSachDangVien
    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  deleteDangVien(id: number) {
    this.dangVienService.delete(id).then(() => {
      this.getDangVien();
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
    const dialogRef = this.dialog.open(alertComponent, {
      width: "500px",
      data: { mess: "Đã hoàn thành" || null },
    });
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
}
