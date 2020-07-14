import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { TheDb } from "src/app/model/thedb";
import { DangVienService } from "src/app/service/dangvien.service";
import { MatTableDataSource } from "@angular/material/table";
import { DangVien } from "src/app/model/dangvien.model";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { DangVienFormDialog } from "./dang-vien-form-dialog/dang-vien-form-dialog.component";

@Component({
  selector: "dang-vien",
  templateUrl: "dang-vien.component.html",
  styleUrls: ["dang-vien.component.scss"],
})
export class DangVienComponent implements OnInit, OnDestroy {
  constructor(
    private dangVienService: DangVienService,
    public dialog: MatDialog
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
  ];
  dataSource = new MatTableDataSource<DangVien>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  animal;
  name;
  dangVienDangChon: DangVien;
  danhSachDangVien: DangVien[] = [];
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
    this.dataSource = new MatTableDataSource<DangVien>(this.danhSachDangVien);
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
}
